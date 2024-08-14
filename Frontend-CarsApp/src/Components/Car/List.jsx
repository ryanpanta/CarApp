import React from "react";
import HeaderUser from "../HeaderUser";
import styles from "./List.module.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import Paper from "@mui/material/Paper";
import { TablePagination } from "@mui/material";
function List() {
    const [cars, setCars] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    React.useEffect(() => {
        async function fetchCars() {
            try {
                const response = await fetch("https://localhost:7017/api/Car");
                const data = await response.json();
                setCars(data);
                console.log(data);
            } catch (error) {
                console.error("Erro ao buscar os carros:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchCars();
    }, []);

    if (loading) {
        return <h1>Carregando...</h1>;
    }

    if (cars.length === 0) {
        return <h1>Nenhum carro encontrado</h1>;
    }

    if (cars === null) {
        return <h1>Carregando...</h1>;
    } else
        return (
            <section className={styles.section}>
                <HeaderUser />
                <h1>Listagem de carros</h1>
                <div className={styles.tableContainer}>
                    <Paper sx={{ width: "100%", mb: 2 }}>
                        <TableContainer>
                            <Table sx={{ minWidth: 650 }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Modelo</TableCell>
                                        <TableCell>Fabricante</TableCell>
                                        <TableCell>Tipo de Veículo</TableCell>
                                        <TableCell>Ano</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {cars.dados.map((car) => (
                                        <TableRow key={car.id}>
                                            <TableCell>{car.modelo}</TableCell>
                                            <TableCell>
                                                {car.fabricante.nome}
                                            </TableCell>
                                            <TableCell>
                                                {car.tipoVeiculo.nome}
                                            </TableCell>
                                            <TableCell>{car.ano}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            className={styles.pagination}
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={cars.dados.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            labelRowsPerPage="Linhas por página:"
                        labelDisplayedRows={({ from, to, count }) =>
                            `${from}–${to} de ${count !== -1 ? count : `mais de ${to}`}`
                        }
                        />
                    </Paper>
                </div>
            </section>
        );
}

export default List;
