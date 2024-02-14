import { useState } from "react";

export const QRCode = () => {
  const [img, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrData, setQrdata] = useState("");
  const [qrSize, setqrsize] = useState("");

  async function generateQR() {
    setLoading(true);
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(
        qrData
      )}`;
      setImage(url);
    } catch (error) {
      console.error("Error generating QR code ", error);
    } finally {
      setLoading(false);
    }
  }

  function downloadQR() {
    fetch(img)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "qrcode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("Error downloading QR code", error);
      });
  }

  return (
    <div className="app-container">
      <h1>QR CODE GENERATOR</h1>
      <img src={img} className="qr-code-image" />
      {loading && <p>Please wait....</p>}
      <div>
        <label htmlFor="dataInput" className="input-label">
          Data for QR code:
        </label>
        <input
          type="text"
          id="dataInput"
          value={qrData}
          placeholder="Enter data for QR code"
          onChange={(e) => setQrdata(e.target.value)}
        />

        <label htmlFor="sizeInput" className="input-label">
          Image size (eg:150)
        </label>
        <input
          type="text"
          id="sizeInput"
          value={qrSize}
          placeholder="Enter image size"
          onChange={(e) => setqrsize(e.target.value)}
        />
        <button
          className="generate-button"
          disabled={loading}
          onClick={generateQR}
        >
          Generate QR code
        </button>
        <button className="download-button" onClick={downloadQR}>
          Download QR code
        </button>
      </div>
      <footer>
        <p className="footer">
          Designed By <span>Dhinesh melroy</span>
        </p>
      </footer>
    </div>
  );
};
