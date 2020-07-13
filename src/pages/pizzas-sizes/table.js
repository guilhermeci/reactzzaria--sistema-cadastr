import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import {
  Grid,
  Table,
  TableBody,
  TableRow,
  TableCell
} from '@material-ui/core'
import { Add, Edit, Delete } from '@material-ui/icons'
import {
  TableButton as Button,
  TableContainer,
  TableTitle,
  TableTitleContainer as TitleContainer,
  THead,
  Th
} from 'ui'
import { useCollection } from 'hooks'
import { singularOrPlural } from 'utils'
import { PIZZAS_SIZES, NEW, EDIT } from 'routes'
function TablePizzasSizes () {
  const { data: pizzasSizes, removePizzaSize: remove } = useCollection('pizzasSizes')
  const newSizePath = useRouteMatch(`${PIZZAS_SIZES}${NEW}`)
  return (
    <TableContainer>
      <TitleContainer>
        <Grid item>
          <TableTitle>
            Tamanhos Cadastrados
          </TableTitle>
        </Grid>
        <Grid item>
          <Button
            color='primary'
            startIcon={<Add />}
            variant='contained'
            component={Link}
            to={`${PIZZAS_SIZES}${NEW}`}
            disabled={!!newSizePath}
          >
            Adicionar novo tamanho
          </Button>
        </Grid>
      </TitleContainer>
      <Table>
        <THead>
          <TableRow>
            <Th>Nome</Th>
            <Th>Diametro</Th>
            <Th>Fatias</Th>
            <Th>Sabores</Th>
            <Th />
          </TableRow>
        </THead>
        <TableBody>
          {pizzasSizes?.map(pizza => (
            <TableRow key={pizza.id}>
              <TableCell>{pizza.name}</TableCell>
              <TableCell>{pizza.size}</TableCell>
              <TableCell>{pizza.slices} fatias</TableCell>
              <TableCell>{pizza.flavours} {' '} {singularOrPlural(pizza.flavours, 'sabor', 'sabores')}</TableCell>
              <TableCell align='right'>
                <Button
                  startIcon={<Edit />}
                  component={Link}
                  to={`${PIZZAS_SIZES}${EDIT(pizza.id)}`}
                >
                  Editar
                </Button>
                <Button
                  startIcon={<Delete />}
                  variant='contained'
                  color='secondary'
                  onClick={() => remove(pizza.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TablePizzasSizes
