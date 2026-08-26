import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { google } from "googleapis";

const root = process.cwd();
const sourcePath = path.join(root, "src", "lib", "sheets.ts");
const envPath = path.join(root, ".env");
const targetSlug = process.argv[2] ?? "health-and-wellness-in-the-ai-era";

function readEnv(filePath) {
  const env = {};
  const raw = fs.readFileSync(filePath, "utf8");
  for (const line of raw.split(/\r?\n/)) {
    if (!line || line.trimStart().startsWith("#")) continue;
    const match = line.match(/^([^=]+)=(.*)$/);
    if (!match) continue;
    env[match[1].trim()] = match[2] ?? "";
  }
  return env;
}

function findArticleObject(source, slug) {
  const slugIndex = source.indexOf(`slug: "${slug}"`);
  if (slugIndex === -1) {
    throw new Error(`Could not find article slug ${slug}`);
  }

  const start = source.lastIndexOf("  {", slugIndex);
  if (start === -1) {
    throw new Error("Could not find article object start");
  }

  let depth = 0;
  let quote = null;
  let escaped = false;

  for (let i = start; i < source.length; i += 1) {
    const char = source[i];

    if (quote) {
      if (escaped) {
        escaped = false;
        continue;
      }
      if (char === "\\") {
        escaped = true;
        continue;
      }
      if (char === quote) {
        quote = null;
      }
      continue;
    }

    if (char === '"' || char === "'" || char === "`") {
      quote = char;
      continue;
    }

    if (char === "{") depth += 1;
    if (char === "}") {
      depth -= 1;
      if (depth === 0) {
        return source.slice(start, i + 1);
      }
    }
  }

  throw new Error("Could not find article object end");
}

function loadArticle() {
  const source = fs.readFileSync(sourcePath, "utf8");
  const objectSource = findArticleObject(source, targetSlug);
  const script = new vm.Script(`article = ${objectSource};`);
  const context = vm.createContext({ article: null });
  script.runInContext(context);
  return context.article;
}

function rowForArticle(article) {
  return [
    article.id,
    article.status,
    article.title,
    article.slug,
    article.excerpt,
    article.content,
    article.category,
    article.tags.join(","),
    article.source_name,
    article.source_url,
    article.author,
    String(article.ai_generated).toUpperCase(),
    article.reviewed_by,
    article.publish_date,
    article.meta_title,
    article.meta_description,
    article.featured_image,
    JSON.stringify(article.faq_json),
    article.canonical_url,
    article.created_at,
    article.updated_at,
  ];
}

async function main() {
  const env = readEnv(envPath);
  const article = loadArticle();
  const row = rowForArticle(article);

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: env.GOOGLE_SERVICE_ACCOUNT_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = env.GOOGLE_SHEETS_ID;

  const existing = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "Sheet1!A2:U",
  });

  const rows = existing.data.values ?? [];
  const rowIndex = rows.findIndex((current) => current[3] === article.slug);

  if (rowIndex >= 0) {
    const sheetRowNumber = rowIndex + 2;
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `Sheet1!A${sheetRowNumber}:U${sheetRowNumber}`,
      valueInputOption: "RAW",
      requestBody: { values: [row] },
    });
    console.log(`Updated ${article.slug} at Sheet1 row ${sheetRowNumber}`);
    return;
  }

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "Sheet1!A:U",
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [row] },
  });
  console.log(`Appended ${article.slug} to Sheet1`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
