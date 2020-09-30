import React, { FC } from "react";

type PropsType = {
    text: string
}

const Dialog: FC<PropsType> = ({ text }) => <div>{text}</div>;

export default Dialog