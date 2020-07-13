import React from 'react'
import t from 'prop-types'
import { Link, useRouteMatch } from 'react-router-dom'
import {
  Grid,
  List,
  ListItem as MaterialListItem,
  ListItemText,
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
import { PIZZAS_FLAVOURS, NEW, EDIT } from 'routes'
import { useCollection } from 'hooks'

function TablePizzasFlavours () {
  const newFlavourPath = useRouteMatch(`${PIZZAS_FLAVOURS}${NEW}`)
  const { data: pizzasFlavours, remove } = useCollection('pizzasFlavours')
  const { data: pizzasSizes } = useCollection('pizzasSizes')
  console.log('pizzasSizes', pizzasSizes)
  console.log(pizzasFlavours)
  return (
    <TableContainer>
      <TitleContainer>
        <Grid item>
          <TableTitle>
            Sabores Cadastrados
          </TableTitle>
        </Grid>
        <Grid item>
          <Button
            color='primary'
            startIcon={<Add />}
            variant='contained'
            component={Link}
            to={`${PIZZAS_FLAVOURS}${NEW}`}
            disabled={!!newFlavourPath}
          >
            Adicionar novo sabor
          </Button>
        </Grid>
      </TitleContainer>
      <Table>
        <THead>
          <TableRow>
            <Th>Foto</Th>
            <Th>Nome</Th>
            <Th>Sabor</Th>
            <Th />
          </TableRow>
        </THead>
        <TableBody>
          {pizzasFlavours?.map(pizza => (
            <TableRow key={pizza.id}>
              <TableCell>
                <img
                  src={pizza.image}
                  alt={pizza.name}
                  width='50'
                />
              </TableCell>
              <TableCell>{pizza.name}</TableCell>
              <TableCell>
                <List>
                  {Object.entries(pizza.value).map(([sizeId, value]) => {
                    const sizeName = pizzasSizes
                      ?.find(s => s.id === sizeId)
                      ?.name
                    return (
                      <ListItem
                        key={sizeId}
                        name={sizeName}
                        value={value}
                      />)
                  })}
                </List>

              </TableCell>
              <TableCell align='right'>
                <Button
                  startIcon={<Edit />}
                  component={Link}
                  to={`${PIZZAS_FLAVOURS}${EDIT(pizza.id)}`}
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
const ListItem = ({ name = '', value }) => (
  <MaterialListItem>
    <ListItemText>
      <strong>{name}</strong> : R$ {value}
    </ListItemText>
  </MaterialListItem>
)
ListItem.propTypes = {
  name: t.string,
  value: t.number.isRequired
}
export default TablePizzasFlavours
