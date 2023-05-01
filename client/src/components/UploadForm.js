import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";


import Controls from "./controls";
import { useForm, Form } from "./useForm";

// import useEth from "../contexts/EthContext/useEth";

const initialFValues = {
    id: 0,
    artistName: "",
    artistAddr: "",
    donationAmount: 0,
};

export default function UploadForm(props) {
    console.warn("DonateForm", props);
    const { donee: song, handleSubmitDonation } = props;

    // const { state } = useEth();

    const validate = (fieldValues = values) => {
        let temp = { ...errors };
        if ("donationAmount" in fieldValues)
        console.log("donationAmount", fieldValues.donationAmount, fieldValues.donationAmount !== 0);
        if ("donationAmount" in fieldValues)
        temp.donationAmount = (fieldValues.donationAmount !== 0)
        ? ""
        : "This field is required.";
        setErrors({
            ...temp,
        });
        console.log("fieldValues", fieldValues, values, fieldValues===values, Object.values(temp).every((x) => x === ""));

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
            handleSubmitDonation({donationAmount:values.donationAmount, artistAddr:values.artistAddr});
        }
    };

    useEffect(() => {
        if (song != null)
            setValues({
                donationAmount: 0,
                ...song,
            });
    }, [song, setValues]);

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        name="artistName"
                        label="Artist Name"
                        value={values.artistName}
                        onChange={handleInputChange}
                        error={errors.artistName}
                        disabled
                    />
                    <Controls.Input
                        name="artistAddr"
                        label="Artist Address"
                        value={values.artistAddr}
                        onChange={handleInputChange}
                        error={errors.artistAddr}
                        disabled
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controls.Input
                        name="donationAmount"
                        label="Donation (GWei)"
                        value={values.donationAmount}
                        onChange={handleInputChange}
                        error={errors.donationAmount}
                        type="number"
                        // required
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