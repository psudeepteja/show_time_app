"use client";
import Image from 'next/image';
import React, { useState } from 'react';

interface Seat {
    GridSeatNum: number | string;
    SeatStatus: '0' | '1';
    gridRowId?: string;
    PhyRowId?: string;
    emptySpace?: boolean;
    seatNumber?: string | null;
    displaySeatNumber?: string;
}

interface Row {
    GridRowId: string;
    PhyRowId: string;
    objSeat: Seat[];
}

interface Area {
    AreaCode: string;
    AreaDesc: string;
    objRow: Row[];
}

interface SeatLayoutData {
    colAreas: {
        objArea: Area[];
    };
}

interface SeatSelectionProps {
    seatSelectionData: {
        seatLayout: SeatLayoutData;
    } | null | undefined;
}

const SeatSelection: React.FC<SeatSelectionProps> = ({ seatSelectionData }) => {
    const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

    const handleSeatClick = (gridRowId: string, PhyRowId: string, GridSeatNum: number | string) => {
        const seat: Seat = {
            gridRowId, PhyRowId, GridSeatNum,
            SeatStatus: '0'
        };
        const isSelected = selectedSeats.some(
            (selectedSeat) =>
                selectedSeat.gridRowId === gridRowId && selectedSeat.GridSeatNum === GridSeatNum
        );
        if (isSelected) {
            setSelectedSeats(selectedSeats.filter((seat) => !(seat.gridRowId === gridRowId && seat.GridSeatNum === GridSeatNum)));
        } else {
            setSelectedSeats([...selectedSeats, seat]);
        }
    };

    if (!seatSelectionData) {
        return <h1 className='text-center h-screen'>OOPS! Something went wrong, Please Try again</h1>;
    }

    return (
        <div className='seat-selection-container'>
            <div className='flex flex-col justify-center overflow-x-auto m-4'>
                <div>
                    {seatSelectionData?.seatLayout?.colAreas?.objArea.map((area) => (
                        <div key={area.AreaCode} className="mb-6">
                            <h3 className="text-lg font-bold text-center">{area.AreaDesc}</h3>
                            {area.objRow.map((row) => {
                                const objSeating = [...row.objSeat];
                                const seatNums = objSeating.map(seat => seat.GridSeatNum);
                                const minGridSeatNum = 1;
                                const maxGridSeatNum = Math.max(...seatNums.map(num => typeof num === 'string' ? parseInt(num) : num));
                                const completeSeats: Seat[] = [];

                                for (let i = minGridSeatNum; i <= maxGridSeatNum; i++) {
                                    const seat = objSeating.find(seat => seat.GridSeatNum === i.toString() || seat.GridSeatNum === i);
                                    if (seat) {
                                        completeSeats.push(seat);
                                    } else {
                                        completeSeats.push({ GridSeatNum: i, emptySpace: true, SeatStatus: "0" });
                                    }
                                }

                                return (
                                    <div key={row.GridRowId} className='flex items-center gap-4'>
                                        <p className='pt-2'>{row.PhyRowId}</p>
                                        <div className='flex'>
                                            {completeSeats.map((seat) => (
                                                <button
                                                    key={seat.GridSeatNum}
                                                    onClick={() => handleSeatClick(row.GridRowId, row.PhyRowId, seat.GridSeatNum)}
                                                    disabled={seat.SeatStatus !== '0'}
                                                    className={`m-1 w-8 h-8 rounded-lg flex items-center justify-center ${seat.emptySpace && ('invisible ')} ${selectedSeats.some(
                                                        (selectedSeat) =>
                                                            selectedSeat.gridRowId === row.GridRowId &&
                                                            selectedSeat.GridSeatNum === seat.GridSeatNum
                                                    ) && seat.SeatStatus === '0'
                                                        ? 'bg-green-600 text-white'
                                                        : seat.SeatStatus === '1'
                                                            ? 'bg-red-500 text-white cursor-not-allowed'
                                                            : 'bg-gray-200 text-gray-700 cursor-pointer'
                                                        }`}
                                                >
                                                    <span className='text-xs'>{seat.GridSeatNum}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
            <div className="mb-6 flex justify-center">
                <Image src="https://assetscdn1.paytm.com/movies_new/_next/static/media/screen-icon.8dd7f126.svg" alt='screen' className='w-full' width={600} height={0} />
            </div>
            <div>
                <h3 className="text-lg font-bold">Selected Seats:</h3>
                <ul className='flex gap-2'>
                    {selectedSeats.map((seat, index) => (
                        <li key={index} >
                            {seat.PhyRowId}{seat.GridSeatNum}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default SeatSelection;
