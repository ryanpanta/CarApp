import React from "react";
import HeaderUser from "../HeaderUser";
import { styled } from "@mui/material/styles";
import styles from "./List.module.css";
import Table from "@mui/material/Table";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "../Form/Button";
import { Trash2, Pencil } from "lucide-react";
import Paper from "@mui/material/Paper";
import { Autocomplete, TablePagination, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import Loading from "../Helper/Loading";
import { toast } from "react-toastify";

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
                },
            },
        },
        MuiAutocomplete: {
            styleOverrides: {
                inputRoot: {
                    fontSize: "1.6rem",
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
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#5F95FF",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

function List() {
    const [cars, setCars] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [totalRows, setTotalRows] = React.useState(0);

    // Inputs que vão estar setados no modal de edição
    const [modelo, setModelo] = React.useState("");
    const [maker, setMaker] = React.useState(null);
    const [carType, setCarType] = React.useState(null);
    const [ano, setAno] = React.useState("");

    // Estados para receber os dados dos selects
    const [makers, setMakers] = React.useState([]);
    const [carTypes, setCarTypes] = React.useState([]);

    const [openModal, setOpenModal] = React.useState(false);
    const [index, setIndex] = React.useState(null);

    async function fetchMakers() {
        try {
            const response = await fetch("https://localhost:7017/api/Maker");
            const data = await response.json();
            setMakers(data.dados);
        } catch (error) {
            console.error("Erro ao buscar os fabricantes:", error);
        }
    }

    async function fetchCarTypes() {
        try {
            const response = await fetch("https://localhost:7017/api/CarType");
            const data = await response.json();
            setCarTypes(data.dados);
        } catch (error) {
            console.error("Erro ao buscar os fabricantes:", error);
        }
    }

    const makersData = makers.map((maker) => ({
        value: maker.id,
        label: maker.nome,
    }));

    const carTypesData = carTypes.map((carType) => ({
        value: carType.id,
        label: carType.nome,
    }));

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    async function fetchCars() {
        try {
            setLoading(true);
            const response = await fetch(
                `https://localhost:7017/api/Car?page=${page}&pageSize=${rowsPerPage}`
            );
            const data = await response.json();
            setCars(data);
            setTotalRows(Number(data.totalItems));
        } catch (error) {
            console.error("Erro ao buscar os carros:", error);
        } finally {
            setLoading(false);
        }
    }

    React.useEffect(() => {
        fetchCars();
    }, [page, rowsPerPage]);

    async function handleDelete(index) {
        const confirm = window.confirm("Deseja realmente deletar este carro?");
        try {
            let response;
            if (confirm) {
                response = await fetch(
                    `https://localhost:7017/api/Car/${cars.dados[index].id}`,
                    {
                        method: "DELETE",
                    }
                );
            }
            console.log(response);
            if (response.ok) {
                fetchCars();
            }
        } catch (error) {
            console.error("Erro ao deletar o carro:", error);
        }
    }

    function handleEdit(index) {
        fetchMakers();
        fetchCarTypes();
        setAno(cars.dados[index].ano);
        setModelo(cars.dados[index].modelo);
        setMaker({
            value: cars.dados[index].fabricante.id,
            label: cars.dados[index].fabricante.nome,
        });
        setCarType({
            value: cars.dados[index].tipoVeiculo.id,
            label: cars.dados[index].tipoVeiculo.nome,
        });
        setOpenModal(true);
        setIndex(index);
    }

    async function handleEditSubmit(event) {
        event.preventDefault();
        try {
            const response = await fetch("https://localhost:7017/api/Car", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    id: cars.dados[index].id,
                    modelo,
                    fabricanteId: maker.value,
                    tipoVeiculoId: carType.value,
                    ano,
                }),
            });
            if (response.ok) {
                fetchCars();
                setOpenModal(false);
                toast.success("Carro editado com sucesso!");
            }
        } catch (error) {
            console.error("Erro ao editar o carro:", error);
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <section className={styles.section}>
                {loading && <Loading />}
                <HeaderUser />
                <h1 className="titulo">Listagem de Carros</h1>
                <div className={styles.tableContainer}>
                    {cars.dados && cars.dados.length > 0 ? (
                        <Paper
                            className={styles.paper}
                            sx={{ width: "100%", mb: 2 }}
                        >
                            <TableContainer sx={{ borderRadius: "20px" }}>
                                <Table sx={{ minWidth: 650 }}>
                                    <TableHead>
                                        <StyledTableRow>
                                            <StyledTableCell>
                                                Modelo
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                Fabricante
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                Tipo de Veículo
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                Ano
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                Ações
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    </TableHead>
                                    <TableBody>
                                        {cars.dados.map((car, index) => (
                                            <StyledTableRow key={car.id}>
                                                <StyledTableCell>
                                                    {car.modelo}
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    {car.fabricante.nome}
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    {car.tipoVeiculo.nome}
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    {car.ano}
                                                </StyledTableCell>
                                                <StyledTableCell
                                                    className={styles.actions}
                                                >
                                                    <Trash2
                                                        color="#f84343DD"
                                                        onClick={() => {
                                                            handleDelete(index);
                                                        }}
                                                    />{" "}
                                                    <Pencil
                                                        color="#4b8affa2"
                                                        onClick={() => {
                                                            handleEdit(index);
                                                        }}
                                                    />
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                className={styles.pagination}
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={totalRows}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                labelRowsPerPage="Linhas por página:"
                                labelDisplayedRows={({ from, to, count }) =>
                                    `${from}–${to} de ${
                                        count !== -1 ? count : `mais de ${to}`
                                    }`
                                }
                            />
                        </Paper>
                    ) : (
                        <div className={styles.wrapper}>
                            <h3>Nenhum carro encontrado :(</h3>
                            <p>Vamos começar adiciando um</p>
                            <Link to="/carros/cadastro">
                                <Button
                                    text="Cadastrar um veículo"
                                    variant="primary"
                                ></Button>
                            </Link>
                        </div>
                    )}
                </div>
                {openModal && (
                    <ModalEdit
                        modelo={modelo}
                        setModelo={setModelo}
                        maker={maker}
                        setMaker={setMaker}
                        handleEditSubmit={handleEditSubmit}
                        carType={carType}
                        setCarType={setCarType}
                        ano={ano}
                        setAno={setAno}
                        makersData={makersData}
                        carTypesData={carTypesData}
                        onClose={() => setOpenModal(false)}
                    />
                )}
            </section>
        </ThemeProvider>
    );
}

function ModalEdit({
    modelo,
    setModelo,
    maker,
    setMaker,
    carType,
    setCarType,
    ano,
    setAno,
    makersData,
    carTypesData,
    handleEditSubmit,
    onClose,
}) {
    const modalRef = React.useRef(null);
    return (
        <div
            className={styles.modal}
            ref={modalRef}
            onClick={(e) => {
                if (e.target === modalRef.current) {
                    setOpenModal(false);
                }
            }}
        >
            <div className={styles.wrapperModal}>
                <h3>Editar carro</h3>
                <form onSubmit={handleEditSubmit}>
                    <TextField
                        id="outlined-basic"
                        sx={{ width: 400 }}
                        label="Modelo"
                        variant="outlined"
                        type="text"
                        value={modelo}
                        onChange={({ target }) => setModelo(target.value)}
                    />

                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={makersData}
                        sx={{ width: 400 }}
                        renderInput={(params) => (
                            <TextField {...params} label="Fabricante" />
                        )}
                        value={maker}
                        onChange={(event, newValue) => {
                            setMaker(newValue);
                        }}
                    />
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={carTypesData}
                        sx={{ width: 400 }}
                        renderInput={(params) => (
                            <TextField {...params} label="Tipo de Veículo" />
                        )}
                        value={carType}
                        onChange={(event, newValue) => {
                            setCarType(newValue);
                        }}
                    />
                    <TextField
                        id="outlined-basic"
                        sx={{ width: 400 }}
                        label="Ano"
                        variant="outlined"
                        type="number"
                        value={ano}
                        onChange={({ target }) => setAno(target.value)}
                    />
                    <Button text="Cadastrar" variant="primary" />
                </form>
            </div>
        </div>
    );
}

export default List;
