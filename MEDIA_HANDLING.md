# Media Handling Best Practices

## ✅ Correct Approach (Currently Implemented)

### Project Images & Videos
Store all media assets in the **public folder**:
```
client/
  public/
    images/
      project1.png
      project2.png
      project3.png
    videos/
      demo1.mp4
      demo2.webm
```

### Reference in JSON
```json
{
  "id": 1,
  "title": "Project Name",
  "image": "/images/project1.png",
  "video": "/videos/demo1.mp4"
}
```

### Why This Works
- ✅ Files in `public/` are served as static assets
- ✅ Paths starting with `/` resolve correctly in production
- ✅ No bundling/processing needed for large media
- ✅ Easy to update without rebuilding

## ❌ What NOT to Do

### Don't Store Media in Backend
```javascript
// ❌ BAD - Don't do this
app.post('/api/upload-image', upload.single('image'), ...)
```
**Why**: Adds unnecessary complexity, server storage, and latency

### Don't Embed in JSON
```json
{
  "image": "data:image/png;base64,iVBORw0KG..." // ❌ BAD
}
```
**Why**: Makes JSON files huge and unreadable

### Don't Use External URLs (unless CDN)
```json
{
  "image": "https://random-site.com/image.png" // ⚠️ Risky
}
```
**Why**: External dependencies, broken links, slow loading

## 🎯 Production Deployment

### Option 1: Same Server
Deploy `client/dist` and serve static files:
```javascript
app.use(express.static('client/dist'));
```

### Option 2: CDN (Recommended)
Upload `public/images` to:
- Cloudinary
- AWS S3 + CloudFront
- Vercel/Netlify (automatic)

Update JSON paths:
```json
{
  "image": "https://cdn.example.com/images/project1.png"
}
```

## 📝 Current Implementation Status
✅ JSON references `/images/` paths
✅ No media stored in backend
✅ No base64 encoding
✅ Ready for public folder population
