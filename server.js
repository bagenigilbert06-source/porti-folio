const express = require("express");
const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json({ limit: "20kb" }));
app.post("/api/contact", async (req, res) => {
  const clean = value => typeof value === "string" ? value.trim() : "";
  const contact = { name: clean(req.body.name), email: clean(req.body.email), subject: clean(req.body.subject), message: clean(req.body.message) };
  if (contact.name.length < 2 || !/^\S+@\S+\.\S+$/.test(contact.email) || contact.subject.length < 3 || contact.message.length < 10) return res.status(400).json({ message: "Please complete every field with valid information." });
  const record = { id: crypto.randomUUID(), ...contact, createdAt: new Date().toISOString() };
  const dir = path.join(__dirname, "data"); const file = path.join(dir, "messages.json");
  try { await fs.mkdir(dir, { recursive: true }); let messages = []; try { messages = JSON.parse(await fs.readFile(file, "utf8")); } catch (e) { if (e.code !== "ENOENT") throw e; } messages.push(record); await fs.writeFile(file, JSON.stringify(messages, null, 2)); res.status(201).json({ message: "Message received.", id: record.id }); }
  catch { res.status(500).json({ message: "The message could not be saved. Please try again." }); }
});
app.use(express.static(path.join(__dirname, "build")));
app.get("*", (_, res) => res.sendFile(path.join(__dirname, "build", "index.html")));
app.listen(PORT, () => console.log(`Dev Gilbert portfolio running on http://localhost:${PORT}`));
