'use client';
import axios from 'axios';
import { useState } from 'react';

export default function EmailSender() {
  const [fromEmail, setFromEmail] = useState('');
  const [toEmail, setToEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('from', fromEmail);
  formData.append('to', toEmail);
  formData.append('subject', subject);
  formData.append('message', message);
  if (file) formData.append('file', file);

  try {
    setLoading(true);
    const res = await axios.post('http://localhost:5000/send-email', formData);

    const result = await res.data;
    alert(result.message);

    if (result) {
      setToEmail(''); // ✅ Reset only the "To" field
    }
  } catch (err) {
    console.error(err);
    alert('Failed to send email.');
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">📧 Email Sender</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* From Email */}
          <input
            type="email"
            className="w-full p-3 border rounded-2xl border-gray-300  focus:outline-none focus:border-red-500 transition"
            placeholder="Sender Email"
            value={fromEmail}
            onChange={(e) => setFromEmail(e.target.value)}
            required
          />

          {/* To Email */}
          <input
            type="email"
            className="w-full p-3 border border-gray-300 rounded-2xl  focus:outline-none focus:border-red-500 transition"
            placeholder="Recipient Email"
            value={toEmail}
            onChange={(e) => setToEmail(e.target.value)}
            required
          />

          {/* Subject */}
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-2xl  focus:outline-none focus:border-red-500 transition"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />

          {/* Message */}
          <textarea
            className="w-full p-3 border border-gray-300 rounded-2xl h-32 resize-none focus:outline-none focus:border-red-500 transition"
            placeholder="Your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />

          {/* File Upload */}
          <label className="block w-fit bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 rounded-2xl px-4 py-2 cursor-pointer transition">
            <span>{file?.name || '📎 Choose a file'}</span>
            <input
              type="file"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-400 hover:bg-red-500 text-white font-semibold py-3 rounded-2xl transition disabled:bg-blue-300"
          >
            {loading ? 'Sending...' : 'Send Email'}
          </button>
        </form>
      </div>
    </div>
  );
}
