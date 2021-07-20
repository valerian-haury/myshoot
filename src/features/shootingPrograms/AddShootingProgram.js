import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {shootingProgramAdded} from "./shootingProgramsSlice";
import {TargetSelector} from "../components/TargetSelector";

import {Form, Input, Button, DatePicker, Select} from "antd";
import locale from "antd/es/date-picker/locale/fr_FR";
import moment from "moment";
import {WeaponsSelector} from "../components/WeaponSelector";
import {ProgramTable} from "../components/ProgramTable";


const {Option} = Select

export const AddShootingProgram = () => {
    const [title, setTitle] = useState('')
    const [shooter, setShooter] = useState('')
    const [targetId, setTargetId] = useState(0)
    const [weaponId, setWeaponId] = useState(0)
    const [date, setDate] = useState(new Date())
    const [program, setProgram] = useState([{key: 1, score: null, direction: ''}])
    const [programLenght, setProgramLenght] = useState(1)

    const [form] = Form.useForm();

    const dispatch = useDispatch()

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

    const clearState = () => {
        setTitle('')
        setShooter('')
        setTargetId(0)
        setWeaponId(0)
        setDate(new Date())
        setProgramLenght(1)
        setProgram([{key: 1, score: null, direction: ''}])
        form.resetFields()
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

    const isScoreNotNull = (currentValue) => currentValue.score !== null;
    const isDirectionSet = (currentValue) => currentValue.direction !== '';
    const formatedProgram = program.slice(0, programLenght)
    const canSave = ([title, shooter].every(Boolean) && formatedProgram.every(isScoreNotNull) && formatedProgram.every(isDirectionSet))

    const onFinish = () => {
        if (canSave) {
            dispatch(
                shootingProgramAdded(
                    title,
                    shooter,
                    weaponId,
                    targetId,
                    date.toLocaleDateString(),
                    formatedProgram
                )
            )
        }
        clearState()
    }

    const onFinishFailed = () => {
        console.log("hop error")
    }


    return (
        <section
            style={{
                width: "100%",
                minHeight: "100vh",
                padding: "0 20px",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-evenly"
            }}>
            <Form
                name="basic"
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <h2>Ajouter un nouveau programme de tir</h2>
                <Form.Item
                    label="Titre"
                    name="title"
                    value={title}
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
                    initialValue={moment(date, 'DD-MM-YYYY')}
                    rules={[
                        {
                            required: true,
                            message: 'Veuillez sélectionner une date',
                        },
                    ]}
                >
                    <DatePicker locale={locale} format={'DD-MM-YYYY'}
                                onChange={onDateChange}/>
                </Form.Item>
                <TargetSelector targetId={targetId} onClick={handleSelectorClick}/>
                <WeaponsSelector weaponsId={weaponId} onClick={handleSelectorClick}/>
                <div className="divfix">
                    <Form.Item>
                        <Button className={"submit-button"} type="primary" htmlType="submit" disabled={!canSave}>
                            SAUVEGARDER
                        </Button>
                    </Form.Item>
                </div>
            </Form>
            <div>
                <Form.Item label="Nombre de coup :">
                    <Select value={programLenght} style={{width: 60}} onChange={handleShotNumberChange}>
                        {Array.from({length: 50}, (_, i) => i + 1).map(number => (
                            <Option key={number} value={number}>{number}</Option>))}
                    </Select>
                </Form.Item>
                <ProgramTable lenght={programLenght} program={program} onChange={handleProgramTableChange}/>
            </div>
        </section>
    )
}