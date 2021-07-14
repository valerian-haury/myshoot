import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {shootingProgramAdded} from "./shootingProgramsSlice";
import {TargetSelector} from "../components/TargetSelector";

import {Form, Input, Button, DatePicker, Select} from "antd";
import locale from "antd/es/date-picker/locale/fr_FR";
import moment from "moment";
import {WeaponsSelector} from "../components/WeaponSelector";
import {ProgramTable} from "../components/ProgramTable";


const {Option} = Select

const defaultProgram = [
    {key: 1, score: 7, direction: 'TL'},
    {key: 2, score: 6, direction: 'L'},
    {key: 3, score: 8, direction: 'R'},
    {key: 4, score: 4, direction: 'BL'},
    {key: 5, score: 5, direction: 'BR'},
    {key: 6, score: 6, direction: 'B'},
    {key: 7, score: 8, direction: 'R'},
    {key: 8, score: 9, direction: 'T'},
    {key: 9, score: 2, direction: 'BL'},
    {key: 10, score: 10, direction: 'C'},
]


export const AddShootingProgram = () => {
    const [title, setTitle] = useState('')
    const [shooter, setShooter] = useState('')
    const [targetId, setTargetId] = useState(0)
    const [weaponId, setWeaponId] = useState(0)
    const [date, setDate] = useState(new Date())
    const [program, setProgram] = useState(defaultProgram)
    const [programLenght, setProgramLenght] = useState(10)

    const handleSelectorClick = (e) => {
        const [name, id] = e.currentTarget.id.split('-')
        switch (name) {
            case 'target':
                setTargetId(parseInt(id))
                break;
            case 'weapon':
                setWeaponId(parseInt(id))
                break;
        }
    }

    const handleProgramTableChange = (newProgram) => {
        setProgram(newProgram)
    }

    const handleShotNumberChange = (newProgramLenght) => {
        if (program.length < newProgramLenght) { // if the new program lenght is bigger we need to push new empty shots to the program

            let i = program.length + 1
            const newProgram = program.slice()
            while (newProgram.length < newProgramLenght) {
                let defaultShot = {key: i, score: null, direction: ''}
                newProgram.push(defaultShot)
                i++
            }
            console.log(newProgram)
            setProgram(newProgram)
        }

        setProgramLenght(newProgramLenght)
    }

    const onTitleChanged = (e) => {
        setTitle(e.target.value)
    }

    const onShooterChanged = (e) => {
        setShooter(e.target.value)
    }

    const onDateChange = (e) => {
        if (e) {
            setDate(e._d)
        } else {
            setDate(new Date())
        }
    }

    const onFinish = () => {
        console.log("hop finish")
    }

    const onFinishFailed = () => {
        console.log("hop error")
    }

    const canSave = [title, shooter].every(Boolean)

    return (
        <section
            style={{width: "100%", padding: "0 20px", display: "flex", flexWrap: "wrap", justifyContent: "space-evenly"}}>
            <Form
                name="basic"

                wrapperCol={{
                    span: 10,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <h2>Ajouter un nouveau programme de tir</h2>
                <Form.Item
                    label="Titre"
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: 'Veuillez donner un titre à votre programme',
                        },
                    ]}
                >
                    <Input onChange={onTitleChanged}/>
                </Form.Item>
                <Form.Item
                    label="Tireur"
                    name="shooter"
                    rules={[
                        {
                            required: true,
                            message: 'Veuillez renseigner votre nom',
                        },
                    ]}
                >
                    <Input onChange={onShooterChanged}/>
                </Form.Item>
                <Form.Item
                    label="Date"
                    name="date"
                    rules={[
                        {
                            required: true,
                            message: 'Veuillez sélectionner une date',
                        },
                    ]}
                >
                    <DatePicker locale={locale} defaultValue={moment(date, 'DD-MM-YYYY')} format={'DD-MM-YYYY'}
                                onChange={onDateChange}/>
                </Form.Item>
                <TargetSelector targetId={targetId} onClick={handleSelectorClick}/>
                <WeaponsSelector weaponsId={weaponId} onClick={handleSelectorClick}/>
            </Form>
            <div>
                <Form.Item label="Nombre de coup :">
                    <Select defaultValue={programLenght} style={{width: 60}} onChange={handleShotNumberChange}>
                        {Array.from({length: 50}, (_, i) => i + 1).map(number => (
                            <Option key={number} value={number}>{number}</Option>))}
                    </Select>
                </Form.Item>
                <ProgramTable lenght={programLenght} program={program} onChange={handleProgramTableChange}/>
            </div>
        </section>
    )
}