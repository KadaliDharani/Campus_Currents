const mongojs = require('mongojs');
const marked = require('marked');
const slugify = require('slugify');
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const dompurify = createDomPurify(new JSDOM().window);

const db = mongojs('blog', ['articles']);

const articleSchema = {
  user: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  markdown: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  sanitizedHtml: {
    type: String,
    required: true
  }
};

db.articles.insert = function (doc, callback) {
  if (doc.title) {
    doc.slug = slugify(doc.title, { lower: true, strict: true });
  }

  if (doc.markdown) {
    doc.sanitizedHtml = dompurify.sanitize(marked(doc.markdown));
  }

  mongojs.Collection.prototype.insert.call(this, doc, callback);
};

module.exports = db.articles;
