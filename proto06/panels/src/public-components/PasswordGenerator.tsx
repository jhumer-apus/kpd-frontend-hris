// App.js
import React, { useState } from "react";
import { Checkbox, Input,  Typography, Button } from "@material-tailwind/react";

export default function PasswordGenerator(){
	const [password, setPassword] = useState("");
	const [passwordLength, setPasswordLength] = useState(12);
	const [useSymbols, setUseSymbols] = useState(true);
	const [useNumbers, setUseNumbers] = useState(true);
	const [useLowerCase, setUseLowerCase] = useState(true);
	const [useUpperCase, setUseUpperCase] = useState(true);
	const [successMessage, setSuccessMessage] = useState("");

	const generatePassword = () => {
		let charset = "";
		let newPassword = "";

		if (useSymbols) charset += "!@#$%^&*()";
		if (useNumbers) charset += "0123456789";
		if (useLowerCase) charset += "abcdefghijklmnopqrstuvwxyz";
		if (useUpperCase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

		for (let i = 0; i < passwordLength; i++) {
			newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
		}

		setPassword(newPassword);
	};

	const copyToClipboard = () => {
		const el = document.createElement("textarea");
		el.value = password;
		document.body.appendChild(el);
		el.select();
		document.execCommand("copy");
		document.body.removeChild(el);
		setSuccessMessage("Password copied to clipboard!");
		setTimeout(() => setSuccessMessage(""), 2000);
		// Hide message after 2 seconds
	};

	return (
		<div className="border-solid border-4 border-slate-900 rounded-xl p-4">
			<Typography variant="h3" className="text-center">
                Password Generator
            </Typography>

            <div className="mt-4">
                <Input
                    type="number"
                    min="8"
                    max="32"
                    value={passwordLength}
                    label="Password Length:"
                    onChange={(e:any) => setPasswordLength(parseInt(e.target.value))}
                />

            </div>

            <div className="md:flex mt-4 md:space-x-4">
                <Checkbox 
                    label="Symbols"
                    checked={useSymbols}
					onChange={() => setUseSymbols(!useSymbols)}
                />
                <Checkbox 
                    label="Numbers"
                    checked={useNumbers}
                    onChange={() => setUseNumbers(!useNumbers)}
                />
                <Checkbox 
                    label="LowerCase"
                    checked={useLowerCase}
                    onChange={() => setUseLowerCase(!useLowerCase)}
                />
                <Checkbox 
                    label="UpperCase"
                    checked={useUpperCase}
                    onChange={() => setUseUpperCase(!useUpperCase)}
                />
            </div>
            <div className="m-auto mt-4 w-fit">
                <Button onClick={generatePassword}>
                    Generate Password
                </Button>
            </div>
			{password && (
				<div className="md:flex mt-4 md:space-x-4 md:items-center">
                    <Input
                        type="text" 
                        value={password} 
                        label="Generated Password"
                        readOnly
                        className="p-4"
                    />
                    <div className="m-auto w-fit">
                        <Button
                            onClick={copyToClipboard}
                            className="text-center my-2"
                        >
                            Copy
                        </Button>
                    </div>
				</div>
			)}
			{successMessage && (
				<p
					style={{
						color: "green",
						textAlign: "center",
					}}
				>
					{successMessage}
				</p>
			)}
		</div>
	);
};

