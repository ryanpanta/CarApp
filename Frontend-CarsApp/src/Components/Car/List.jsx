import React from "react";
import HeaderUser from "../HeaderUser";
import { styled } from "@mui/material/styles";
import styles from "./List.module.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "../Form/Button";
import { Trash2, Pencil } from "lucide-react";
import Paper from "@mui/material/Paper";
import { TablePagination } from "@mui/material";
import { Link } from "react-router-dom";
import Loading from "../Helper/Loading";

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

    return (
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
                                        <StyledTableCell>Ano</StyledTableCell>
                                        <StyledTableCell>Ações</StyledTableCell>
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
                                                <Pencil color="#4b8affa2" />
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
        </section>
    );
}

export default List;
