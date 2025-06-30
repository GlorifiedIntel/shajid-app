export default function UploadDocumentsPage() {
  return (
    <div className="application-page">
      <h1>Upload Supporting Documents</h1>
      <p>Please upload your required files (e.g., birth certificate, UTME result, O'Level results).</p>

      <form>
        <div>
          <label>Choose a file:</label>
          <input type="file" name="document" />
        </div>
        <button type="submit">Upload Document</button>
      </form>
    </div>
  );
}