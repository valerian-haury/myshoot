import React, {useState} from 'react';
import {Circle, Layer, Stage, Image} from "react-konva";
import useImage from "use-image";
import {Button} from "antd";

// TRUE CONSTANT
const SECTION_BORDER = 8;
const BULLET_RADIUS = 4;
const BULLSEYE_SIZE = 5;

function Canvas({ canvasSize, maxScore, target, program, canGenerate }) {

    const [dots, setDots] = useState([]);

    const Target = () => {
        const [image] = useImage(target);
        return <Image x={0} y={0} width={canvasSize} height={canvasSize} image={image}/>;
    };

    function generateVisual() {

        const tempDots = [];
        program.forEach((shot, index) => {
            let score = shot.score;
            let direction = shot.direction;

            let radius = 0;
            let angle = 0;

            if (direction === 'C' && score === maxScore) { // if the shoot is a bullseye
                radius = Math.random() * BULLSEYE_SIZE;
                angle = Math.random();
            } else {
                radius = scoreToRadius(score, canvasSize / 2, maxScore);
                angle = directionToAngle(direction) // from 0 to 1
            }

            var pt_angle = angle * 2 * Math.PI;
            var pt_radius_sq = radius * radius;
            var pt_x = Math.sqrt(pt_radius_sq) * Math.cos(pt_angle);
            var pt_y = Math.sqrt(pt_radius_sq) * Math.sin(pt_angle);
            tempDots.push(<Circle key={"dot-" + index} x={pt_x + canvasSize / 2} y={pt_y + canvasSize / 2}
                                  radius={BULLET_RADIUS} fill="#e54444"/>)
        });
        setDots(tempDots);
    }


    function scoreToRadius(score, maxRadius, maxScore) {
        let section = maxRadius / maxScore;
        let centerParticle = getRandom(0 + SECTION_BORDER, section - SECTION_BORDER);
        return maxRadius - (section * score) + centerParticle;
    }

    function directionToAngle(direction) {
        let angle = null;
        switch (direction) {
            case 'C': //Center
                angle = 1;
                break;
            case 'T': //Top
                angle = 0.75;
                break;
            case 'B': //Bottom
                angle = 0.25
                break;
            case 'L': //Left
                angle = 0.5;
                break;
            case 'R': //Right
                angle = 0;
                break;
            case 'TL'://Top-left
                angle = 0.625;
                break;
            case 'TR'://Top-right
                angle = 0.875;
                break;
            case 'BL'://Bottom-left
                angle = 0.375;
                break;
            case 'BR'://Bottom-right
                angle = 0.125;
                break;
            default:
                angle = 0;
        }
        return angle + getRandom(-0.0625, 0.0625);
    }

    function getRandom(min, max) {
        return Math.random() * (max - min) + min;
    }

    return (
        <div className="canvas-container" style={{ padding: "30px"}}>
            <Stage className="canvas" style={{ display: "flex", justifyContent: "center" }} width={canvasSize} height={canvasSize}>
                <Layer>
                    <Target target={target}/>
                    {dots.map((dot, index) => {
                        return dot;
                    })}
                </Layer>
            </Stage>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "20px"}}>
                <Button className={"generate-button"} onClick={() => generateVisual()} disabled={!canGenerate}>
                    Générer visuel
                </Button>
            </div>
        </div>
    );
}

export default Canvas;