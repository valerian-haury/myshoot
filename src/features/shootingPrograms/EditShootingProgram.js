import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";

import {selectProgramById, shootingProgramUpdated} from "./shootingProgramsSlice";
import {TargetSelector} from "../components/TargetSelector";

import {Form, Input, Button, DatePicker, Select} from "antd";
import locale from "antd/es/date-picker/locale/fr_FR";
import moment from "moment";
import {WeaponsSelector} from "../components/WeaponSelector";
import {ProgramTable} from "../components/ProgramTable";


const {Option} = Select

function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}

export const EditShootingProgram = ({match}) => {

    const {programId} = match.params
    const programData = Object.assign({}, useSelector(state => selectProgramById(state, programId)))

    const initialProgram = []
    programData.program.forEach((shot, i) => initialProgram.push(clone(shot)))


    const [day, month, year] = programData.date.split('/')
    const formatedDate = new Date(year, month - 1, day)

    const [title, setTitle] = useState(programData.title)
    const [shooter, setShooter] = useState(programData.shooter)
    const [targetId, setTargetId] = useState(programData.targetId)
    const [weaponId, setWeaponId] = useState(programData.weaponId)
    const [date, setDate] = useState(formatedDate)
    const [program, setProgram] = useState(initialProgram)
    const [programLenght, setProgramLenght] = useState(programData.program.length)

    const [form] = Form.useForm();

    const dispatch = useDispatch()
    const history = useHistory()

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
    const canEdit = ([title, shooter].every(Boolean) && formatedProgram.every(isScoreNotNull) && formatedProgram.every(isDirectionSet))

    const onFinish = () => {
        if (canEdit) {
            dispatch(
                shootingProgramUpdated(
                    {
                        id: programId,
                        title,
                        shooter,
                        weaponId,
                        targetId,
                        date: date.toLocaleDateString(),
                        program: formatedProgram
                    }
                )
            )
        }
        history.push(`/`)
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
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <h2>Modifier le programme de tir</h2>
                <Form.Item
                    label="Titre"
                    name="title"
                    initialValue={title}
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
                    initialValue={shooter}
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
                        <Button className={"submit-button"} type="primary" htmlType="submit" disabled={!canEdit}>
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
                <ProgramTable lenght={programLenght} program={formatedProgram} onChange={handleProgramTableChange}/>
            </div>
        </section>
    )
}