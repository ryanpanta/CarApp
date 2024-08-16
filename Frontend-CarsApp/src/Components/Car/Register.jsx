import React from "react";
import HeaderUser from "../HeaderUser";
import styles from "./Register.module.css";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import useForm from "../../Hooks/useForm";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "../Form/Button";
import { toast } from "react-toastify";

function Register() {
    const modelo = useForm("");
    const [makers, setMakers] = React.useState([]);
    const [carTypes, setCarTypes] = React.useState([]);
    const [selectedMaker, setSelectedMaker] = React.useState(null);
    const [selectedCarType, setSelectedCarType] = React.useState(null);

    const ano = useForm("");
    React.useEffect(() => {
        async function fetchMakers() {
            try {
                const response = await fetch(
                    "https://localhost:7017/api/Maker"
                );
                const data = await response.json();
                setMakers(data.dados);
            } catch (error) {
                console.error("Erro ao buscar os fabricantes:", error);
            }
        }

        async function fetchCarTypes() {
            try {
                const response = await fetch(
                    "https://localhost:7017/api/CarType"
                );
                const data = await response.json();
                setCarTypes(data.dados);
            } catch (error) {
                console.error("Erro ao buscar os fabricantes:", error);
            }
        }
        fetchMakers();
        fetchCarTypes();
    }, []);

    const makersData = makers.map((maker) => ({
        value: maker.id,
        label: maker.nome,
    }));

    const carTypesData = carTypes.map((carType) => ({
        value: carType.id,
        label: carType.nome,
    }));

    const theme = createTheme({
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: {
                        fontSize: "1.2rem",
                        "& .MuiInputLabel-root": {
                            fontSize: "1.2rem",
                        },
                        "& .MuiInputBase-input": {
                            fontSize: "1.6rem",
                        },
                        "@media (max-width: 500px)": {
                            width: "300px", 
                        },
                        "@media (max-width: 390px)": {
                            width: "250px", 
                        },
                    },
                },
            },
            MuiAutocomplete: {
                styleOverrides: {
                    inputRoot: {
                        fontSize: "1.6rem",
                        "@media (max-width: 500px)": {
                            width: "300px", 
                        },
                        "@media (max-width: 390px)": {
                            width: "250px", 
                        },
                    },
                    endAdornment: {
                        fontSize: "1.2rem",
                    },
                    option: {
                        fontSize: "1.6rem",
                    },
                },
            },
        },
    }); /*  const [newCar, setNewCar] = React.useState({
        fabricanteId: 0,
        tipoVeiculoId: 0,
    }); */

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const newCar = {
                modelo: modelo.value,
                fabricanteId: selectedMaker.value,
                tipoVeiculoId: selectedCarType.value,
                ano: ano.value,
            };

            const response = await fetch("https://localhost:7017/api/Car", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(newCar),
            });
            console.log(newCar);
            if (response.ok) {
                toast.success("Carro cadastrado com sucesso!");
                modelo.setValue("");
                setSelectedMaker(null);
                setSelectedCarType(null);
                ano.setValue("");
            }
        } catch (error) {
            console.error("Erro ao cadastrar o carro:", error);
        }
    }

    return (
        <ThemeProvider theme={theme}>
            {/* <CssBaseline /> */}
            <section className={styles.section}>
                <HeaderUser />
                <h1 className="titulo">Cadastro de carros</h1>
                <div className={styles.container}>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            id="outlined-basic"
                            className={styles.input}
                            sx={{ width: 400 }}
                            label="Modelo"
                            error={modelo.error}
                            helperText={modelo.error}
                            variant="outlined"
                            type="text"
                            {...modelo}
                        />
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={makersData}
                            sx={{ width: 400 }}
                            renderInput={(params) => (
                                <TextField {...params} label="Fabricante" />
                            )}
                            value={selectedMaker}
                            onChange={(event, newValue) => {
                                setSelectedMaker(newValue);
                            }}
                        />
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={carTypesData}
                            sx={{ width: 400 }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Tipo de Veículo"
                                />
                            )}
                            value={selectedCarType}
                            onChange={(event, newValue) => {
                                setSelectedCarType(newValue);
                            }}
                        />
                        <TextField
                            id="outlined-basic"
                            sx={{ width: 400 }}
                            label="Ano"
                            error={ano.error}
                            helperText={ano.error}
                            variant="outlined"
                            type="number"
                            {...ano}
                        />
                        <Button text="Cadastrar" variant="primary" />
                    </form>
                </div>
            </section>
        </ThemeProvider>
    );
}

export default Register;
