import React from "react";
import "./Spinner.css";

export default function Spinner() {
  return (
    <div className='radar-spinner'>
      <div className='circle'>
        <div className='circle-inner-container'>
          <div className='circle-inner' />
        </div>
      </div>

      <div className='circle'>
        <div className='circle-inner-container'>
          <div className='circle-inner' />
        </div>
      </div>

      <div className='circle'>
        <div className='circle-inner-container'>
          <div className='circle-inner' />
        </div>
      </div>

      <div className='circle'>
        <div className='circle-inner-container'>
          <div className='circle-inner' />
        </div>
      </div>
    </div>
  );
}
