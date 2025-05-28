
import { useEffect, useState } from 'react';

const SliderRange = ({ min, max }) => {
  const [avg, setAvg] = useState((min + max) / 2);
  const [minVal, setMinVal] = useState(avg);
  const [maxVal, setMaxVal] = useState(avg);
  let thumbsize;
  const width = 300;
  const minWidth =
    thumbsize + ((avg - min) / (max - min)) * (width - 2 * thumbsize);
  const styles = {
    min: {
      width: minWidth,
      left: 0
    },
    max: {
      width: thumbsize + ((max - avg) / (max - min)) * (width - 2 * thumbsize),
      left: minWidth
    }
  };

  useEffect(() => {
    setAvg((maxVal + minVal) / 2);
  }, [minVal, maxVal]);


  return (
    <div
      className="min-max-slider"
      data-legendnum="2"
      data-rangemin={min}
      data-rangemax={max}
      data-thumbsize={thumbsize}
      data-rangewidth={width}
    >
      <input
        id="min"
        className="min"
        style={styles.min}
        name="min"
        type="range"
        step="1"
        min={min}
        max={avg}
        value={minVal}
        onChange={({ target }) => setMinVal(Number(target.value))}
      />
      <label htmlFor="min" style={{
        top: "35%",
        position: "absolute"
      }}></label>

      <input
        id="max"
        className="max"
        style={styles.max}
        name="max"
        type="range"
        multiple={true}
        step="1"
        min={avg}
        max={max}
        value={maxVal}
        onChange={({ target }) => setMaxVal(Number(target.value))}
      />
      <label htmlFor="min" style={{
        top: "61%",
        position: "absolute"
      }}></label>
    </div>
  );
}

export default SliderRange;



