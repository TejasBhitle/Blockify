import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";


import Controls from "./controls";
import { useForm, Form } from "./useForm";

// import useEth from "../contexts/EthContext/useEth";

const initialFValues = {
    songName: "",
    songCost: 0,
    songFile: null,
};

export default function UploadForm(props) {
    console.warn("DonateForm", props);
    const { handleUploadSong, setOpenAddNewPopup } = props;

    // const { state } = useEth();

    const validate = (fieldValues = values) => {
        let temp = { ...errors };
        if ("songName" in fieldValues)
            temp.songName = fieldValues.songName
                ? ""
                : "This field is required.";
        if ("songCost" in fieldValues)
            temp.songCost = (fieldValues.songCost !== 0)
            ? ""
                : "This field is required.";
        if ("songFile" in fieldValues)
            temp.songFile = fieldValues.songFile
                ? ""
                : "This field is required.";
        setErrors({
            ...temp,
        });

        if (fieldValues === values)
            return Object.values(temp).every((x) => x === "");
    };

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm,
    } = useForm(initialFValues, true, validate);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            handleUploadSong({
                songName: values.songName,
                songCost: values.songCost,
                songFile: values.songFile,
                closePopup: () => {
                    setOpenAddNewPopup(false);
                }
            });
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        name="songName"
                        label="Song Name"
                        value={values.songName}
                        onChange={handleInputChange}
                        error={errors.songName}
                    />
                    <Controls.Input
                        name="songCost"
                        label="Song Cost"
                        value={values.songCost}
                        onChange={handleInputChange}
                        error={errors.songCost}
                        type="number"
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controls.Input
                        name="songFile"
                        // label="Song File .mp3"
                        value={values.songFile}
                        onChange={handleInputChange}
                        error={errors.songFile}
                        type="file"
                    />
                    <div>
                        <Controls.Button type="submit" text="Submit" />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm}
                        />
                    </div>
                </Grid>
            </Grid>
        </Form>
    );
}