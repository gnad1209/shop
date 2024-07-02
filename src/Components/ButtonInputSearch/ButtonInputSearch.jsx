import React from 'react'
import { SearchOutlined } from '@ant-design/icons';
import InputComponent from '../InputComponent/InputComponent';
import ButtonComponent from '../ButtonComponent/ButtonComponent';

const ButtonInputSearch = (props) => {
    const { size,
        placeholder,
        textButton,
        bordered,
        backgroundColorInput = `#fff`,
        backgroundColorButton = `#fd9b55`,
        colorButton = `#fff`,
    } = props

    return (
        <div style={{ display: `flex`, }}>
            <InputComponent
                size={size}
                placeholder={placeholder}
                variant={bordered}
                style={{ backgroundColor: backgroundColorInput }}
                {...props}
            />
            <ButtonComponent
                size={size}
                textButton={textButton}
                styleTextButton={{ color: colorButton }}
                styleButton={{ background: backgroundColorButton, border: "1px solid white" }}
                icon={<SearchOutlined color={colorButton} style={{ color: '#fff' }} />}
            />
        </div>
    )
}

export default ButtonInputSearch