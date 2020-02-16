import React from 'react';
import classes from'./Input.css';

const Input = (props) => {
    let inputEle = null;
    const inputClasses = [classes.InputEle];
    let validationMsg = null;

    if(props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    switch(props.elementtype) {
        case ('input') : 
            inputEle = <input 
                {...props.elementconfig} 
                className={inputClasses.join(' ')} 
                value={props.value}
                onChange={props.inputChanged}/>
            break;
        
        case ('textarea') : 
            inputEle = <textarea 
                {...props.elementconfig} 
                className={inputClasses.join(' ')} 
                value={props.value}
                onChange={props.inputChanged}/>
            break;
        
        case('select') :
            inputEle = (<select 
                            className={inputClasses.join(' ')} 
                            value={props.value}
                            onChange={props.inputChanged}>
                            {props.elementconfig.options.map((iOption) => {
                                return <option value={iOption.value} key={iOption.value}>
                                            {iOption.displayValue}
                                        </option>
                            } )}
            </select>);
            break;

        default:
            inputEle = <input {...props.elementconfig} className={inputClasses.join(' ')}/>
    }

    return (
        <div className={classes.Input}>
            <label className="Label">{props.label}</label>
            {inputEle}
        </div>
    );
}

export default Input;