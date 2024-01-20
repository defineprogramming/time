import React from 'react';

function MainComponent() {
  const [currentTime, setCurrentTime] = React.useState(new Date());
  const [isSidePanelOpen, setIsSidePanelOpen] = React.useState(false);
  const [clockColor, setClockColor] = React.useState("#FFFFFF");
  const [backgroundColor, setBackgroundColor] = React.useState("#010101");
  const [clockSize, setClockSize] = React.useState(
    window.innerWidth < 640 ? 100 : 200
  );
  const [fontFamily, setFontFamily] = React.useState("font-roboto");
  const [versionInfo] = React.useState({
    version: "1.0.0",
    build: "2023-04-01",
  });
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1);
    const handleResize = () => {
      setClockSize(window.innerWidth < 640 ? 100 : 200);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const toggleSidePanel = () => setIsSidePanelOpen(!isSidePanelOpen);
  const handleClockColorChange = (event) => setClockColor(event.target.value);
  const handleBackgroundColorChange = (event) =>
    setBackgroundColor(event.target.value);
  const handleClockSizeChange = (event) =>
    setClockSize(Number(event.target.value));
  const handleFontFamilyChange = (event) => setFontFamily(event.target.value);
  const timeString = `${currentTime
    .getHours()
    .toString()
    .padStart(2, "0")}:${currentTime
    .getMinutes()
    .toString()
    .padStart(2, "0")}:${currentTime
    .getSeconds()
    .toString()
    .padStart(2, "0")}.${currentTime
    .getMilliseconds()
    .toString()
    .padStart(3, "0")}`;
  const fontSizeClass = `text-[${clockSize}px]`;
  const sidebarWidth = "w-[300px]";
  const buttonPosition = isSidePanelOpen ? "right-0" : "left-0";
  return (
    <>
      <div
        className="flex h-screen transition-all duration-300 ease-in-out overflow-hidden"
        style={{
          backgroundColor: backgroundColor,
        }}
      >
        <div
          className={`transform transition-transform duration-300 ease-in-out bg-[#F8F9FA] dark:bg-[#343A40] shadow-xl fixed inset-y-0 left-0 z-20 ${sidebarWidth} ${
            isSidePanelOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col items-center">
            <h2 className="mb-8 text-2xl font-semibold text-white">Settings</h2>
            <div className="space-y-4 w-full px-2">
              <div>
                <input
                  type="color"
                  id="clockColor"
                  name="clockColor"
                  value={clockColor}
                  onChange={handleClockColorChange}
                  className="form-color w-full h-10 rounded-lg"
                />
                <label htmlFor="clockColor" className="block mt-2 text-white">
                  Clock Color
                </label>
              </div>
              <div>
                <input
                  type="color"
                  id="backgroundColor"
                  name="backgroundColor"
                  value={backgroundColor}
                  onChange={handleBackgroundColorChange}
                  className="form-color w-full h-10 rounded-lg"
                />
                <label
                  htmlFor="backgroundColor"
                  className="block mt-2 text-white"
                >
                  Background Color
                </label>
              </div>
              <div>
                <input
                  type="range"
                  id="clockSize"
                  name="clockSize"
                  min="100"
                  max="400"
                  value={clockSize}
                  onChange={handleClockSizeChange}
                  className="form-range w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <label htmlFor="clockSize" className="block mt-2 text-white">
                  Clock Size
                </label>
              </div>
              <div>
                <select
                  id="fontFamily"
                  name="fontFamily"
                  value={fontFamily}
                  onChange={handleFontFamilyChange}
                  className="form-select w-full rounded-lg"
                >
                  <option value="font-roboto">Roboto</option>
                  <option value="font-opensans">Open Sans</option>
                  <option value="font-lato">Lato</option>
                  <option value="font-montserrat">Montserrat</option>
                </select>
                <label htmlFor="fontFamily" className="block mt-2 text-white">
                  Font Family
                </label>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 text-center text-xs text-white w-full p-4">
            <div className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-semibold px-2 py-1 rounded-md inline-block mb-2">
              Labs
            </div>
            <div>Version: {versionInfo.version}</div>
            <div>Build: {versionInfo.build}</div>
          </div>
        </div>
        <div
          className={`fixed top-0 z-30 ${buttonPosition} transition-all duration-300 ease-in-out`}
          onClick={toggleSidePanel}
        >
          <div className="text-gray-900 dark:text-white text-3xl p-3">
            <i
              className={`fas ${isSidePanelOpen ? "fa-times" : "fa-bars"}`}
            ></i>
          </div>
        </div>
        <div className="relative flex-1 flex justify-center items-center">
          <h1
            className={`${fontSizeClass} ${fontFamily} text-[${clockColor}] z-10`}
          >
            {timeString}
          </h1>
        </div>
      </div>
    </>
  );
}

export default MainComponent;
