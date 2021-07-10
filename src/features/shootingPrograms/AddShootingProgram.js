import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { shootingProgramAdded } from "./shootingProgramsSlice";

export const AddShootingProgram = () => {
    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    const [shooter, setShooter] = useState('')
    
}