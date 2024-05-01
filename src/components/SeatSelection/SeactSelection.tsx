"use client"
import React, { useState } from 'react';

export default function SeatSelection({ seatSelectionData }) {
    const [selectedSeats, setSelectedSeats] = useState([]);

    const handleSeatClick = (gridRowId, PhyRowId, gridSeatNum) => {
        const seat = { gridRowId, PhyRowId, gridSeatNum };
        const isSelected = selectedSeats.some(
            (selectedSeat) =>
                selectedSeat.gridRowId === gridRowId && selectedSeat.gridSeatNum === gridSeatNum
        );
        if (isSelected) {
            setSelectedSeats(selectedSeats.filter((seat) => !(seat.gridRowId === gridRowId && seat.gridSeatNum === gridSeatNum)));
        } else {
            setSelectedSeats([...selectedSeats, seat]);
        }
    };

    return (
        <div className='seat-selection-container'>
            <div className='flex flex-col justify-center overflow-x-auto m-4'>
                <div>
                    {seatSelectionData?.seatLayout?.colAreas?.objArea.map((area) => (
                        <div key={area.AreaCode} className="mb-6">
                            <h3 className="text-lg font-bold text-center">{area.AreaDesc}</h3>
                            {area.objRow.map((row) => (
                                <div key={row.GridRowId} className='flex items-center gap-2'>
                                    <p className='pt-2'>{row.PhyRowId}</p>
                                    <div className='flex'>
                                        {row.objSeat.map((seat) => (
                                            <button
                                                key={seat.GridSeatNum}
                                                onClick={() => handleSeatClick(row.GridRowId, row.PhyRowId, seat.GridSeatNum)}
                                                disabled={seat.SeatStatus !== '0'}
                                                className={`m-1 p-2 w-10 h-10 rounded-lg flex items-center justify-center ${selectedSeats.some(
                                                    (selectedSeat) =>
                                                        selectedSeat.gridRowId === row.GridRowId &&
                                                        selectedSeat.gridSeatNum === seat.GridSeatNum
                                                ) && seat.SeatStatus === '0'
                                                    ? 'bg-orange-500 text-white'
                                                    : seat.SeatStatus === '1'
                                                        ? 'bg-red-500 text-white cursor-not-allowed'
                                                        : 'bg-gray-200 text-gray-700 cursor-pointer'
                                                    }`}
                                            >
                                                <span className='text-sm'>{seat.GridSeatNum}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                    <div className="mb-6 flex justify-center">
                        <img src="https://assetscdn1.paytm.com/movies_new/_next/static/media/screen-icon.8dd7f126.svg" alt='screen' />
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-bold">Selected Seats:</h3>
                    <ul className='flex gap-2'>
                        {selectedSeats.map((seat, index) => (
                            <li key={index} >
                                {seat.PhyRowId}{seat.gridSeatNum}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

