import React, { useState } from "react";

export default function DateConverter() {
  const [date, setDate] = useState("");
  const [hebrewDate, setHebrewDate] = useState("");
  const [error, setError] = useState(null);

  const handleClear = () => {
    setDate("");
    setHebrewDate("");
    setError(null);
  };

  const handleChange = async (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);

    const url = `https://www.hebcal.com/converter?cfg=json&date=${selectedDate}&g2h=1&strict=1`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      if (data.hebrew) {
        setHebrewDate(data.hebrew);
        setError(null);
      } else {
        setHebrewDate("לא נמצאו תוצאות");
        setError(null);
      }
    } catch (error) {
      console.error("שגיאה בהמרת התאריך:", error);
      setHebrewDate("");
      setError(error.message);
    }
  };

  return (
    <div className="dateConverter">
      <form>
        <label htmlFor="date">Enter Date:</label>
        <input type="date" id="date" name="date" onChange={handleChange} />

        {date && <button onClick={handleClear}>Clear</button>}
      </form>

      {hebrewDate && <h2>{hebrewDate}</h2>}
      {error && <p style={{ color: "red" }}>שגיאה: {error}</p>}
    </div>
  );
}
