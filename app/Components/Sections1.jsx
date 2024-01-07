"use client";
import { useState } from "react";
import * as XLSX from "xlsx";
import bg from "@/public/bg-red.png";

const Sections1 = () => {
  const [result, setResult] = useState({
    coupCode: "",
    winnerName: "",
    winnerPhoneNumber: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [showWinnerPopup, setShowWinnerPopup] = useState(false);
  const [alreadySelectedCoupons, setAlreadySelectedCoupons] = useState([]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const pickWinner = async () => {
    if (!selectedFile) {
      alert("Please choose an Excel file.");
      return;
    }

    try {
      const data = await selectedFile.arrayBuffer();
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const sheetData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      if (sheetData.length < 2) {
        alert("The Excel file must contain at least two entries.");
        return;
      }

      animateCounting(sheetData);
    } catch (error) {
      console.error(error);
    }
  };

  const animateCounting = (sheetData) => {
    const startNumber = 100;
    const duration = 50;
    const steps = 200;
    const interval = duration / steps;

    let currentIndex = 23;

    const countingInterval = setInterval(() => {
      const currentDetails = sheetData[currentIndex].slice(0, 5);
      const coupCode = currentDetails[0];
      const winnerName = currentDetails[3];
      const winnerPhoneNumber = currentDetails[4];

      setResult({
        coupCode,
        winnerName,
        winnerPhoneNumber,
      });

      currentIndex++;

      if (currentIndex >= 500) {
        clearInterval(countingInterval);

        // Exclude already selected coupons from random selection
        const availableCoupons = sheetData.filter(
          (coupon) => !alreadySelectedCoupons.includes(coupon[0])
        );

        if (availableCoupons.length === 0) {
          alert("All coupons have been selected.");
          return;
        }

        const winnerDetails =
          availableCoupons[Math.floor(Math.random() * availableCoupons.length)];

        const coupCodeWinner = winnerDetails[0];
        const winnerNameWinner = winnerDetails[3];
        const winnerPhoneNumberWinner = winnerDetails[4];

        setResult({
          coupCode: coupCodeWinner,
          winnerName: winnerNameWinner,
          winnerPhoneNumber: winnerPhoneNumberWinner,
        });

        // Add the selected coupon to the alreadySelectedCoupons list
        setAlreadySelectedCoupons([...alreadySelectedCoupons, coupCodeWinner]);

        handleWinnerPopupOpen(); // Show the winner pop-up
      }
    }, interval);
  };

  const handleWinnerPopupClose = () => {
    setShowWinnerPopup(false);
  };

  const handleWinnerPopupOpen = () => {
    setShowWinnerPopup(true);
  };

  return (
    <div className="font-Sora bg-bg-1 bg-cover min-h-screen">
      <div className=" w-full h-full  bg-bg-3 bg-contain">
        <div
          id="inputArea"
          className=" flex  justify-center  px-8 py-14 border-1 rounded-2xl shadow-2xl"
        >
          <label
            className="text-4xl font-bold text-white"
            htmlFor="fileInput"
            id="fileLabel"
          >
            Upload
          </label>
          <input
            type="file"
            id="fileInput"
            accept=".xlsx, .xls"
            className="hidden"
            onChange={handleFileChange}
          />{" "}
        </div>
      </div>
      <div className="items-center flex flex-col justify-center h-auto px-16 py-20 max-md:px-5 ">
        <div className="w-full max-w-[1128px]  mt-16 mb-12 py-1.5 max-md:max-w-full max-md:my-10">
          <div className="w-full  ">
            <div className="flex flex-col items-center justify-center ">
              <div className="flex items-center justify-center bg-bg-2 bg-cover bg-no-repeat w-[800px] h-[450px] p-14 ">
                <div className=" w-full h-full bg-opacity-45 flex justify-between items-center gap-4 shadow-xl">
                  <div className="  border w-[150px] h-[150px] rounded-full ml-8  shadow-2xl flex flex-col items-center py-14">
                    <span className="font-Sora font-medium text-base ">
                      Coup Code:
                    </span>
                    <div>
                      <span className="font-semibold">{result.coupCode}</span>
                    </div>
                  </div>
                  <div className="border w-[150px] h-[150px] rounded-full   bg-gray-100 bg-opacity-65 shadow-2xl flex flex-col items-center py-14">
                  <span className="font-Sora font-medium text-base ">
                    Name:
                    </span>
                    <div>
                      <span className="font-semibold">{result.winnerName}</span>
                    </div>
                  </div>
                  <div className="border w-[150px] h-[150px] rounded-full mr-3  bg-gray-100 bg-opacity-65 shadow-2xl flex flex-col items-center py-14">
                  <span className="font-Sora font-medium text-base ">
                    Phone:
                    </span>
                    <div id="resultPhone">
                      <span className="font-semibold">
                        {result.winnerPhoneNumber}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <button onClick={()=>pickWinner()} class="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md">
                <span class="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
                <span class="relative px-6 py-3 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
                  <span class="relative text-white"> Spin</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {showWinnerPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-bg-6 bg-cover w-1/2 p-8 flex flex-col items-center rounded shadow-xl animate-fadeIn">
            <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
            <p className="text-lg">
              Coup Code: <strong className="text-xl">{result.coupCode}</strong>
            </p>
            <p className="text-lg">
              Name:<strong className="text-xl">{result.winnerName}</strong>
            </p>
            <p className="text-lg">
              Phone:{" "}
              <strong className="text-xl">{result.winnerPhoneNumber}</strong>
            </p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={handleWinnerPopupClose}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sections1;
