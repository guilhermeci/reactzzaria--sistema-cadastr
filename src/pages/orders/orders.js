import React, { useMemo } from 'react'
import styled from 'styled-components'
import {
  Fab,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Typography
} from '@material-ui/core'
import { Check, DonutLarge, Motorcycle } from '@material-ui/icons'
import { useOrders } from 'hooks'
import { singularOrPlural } from 'utils'
import { TableContainer, TableTitle, THead, Th } from 'ui'
function Orders () {
  const { orders, status, updateOrder } = useOrders()
  const allOrderStatus = useMemo(() => (
    [
      {
        title: 'Pedidos Pendentes',
        type: status.pending,
        nextAction: status.inProgress,
        nextButtonTitle: 'Em produção',
        icon: DonutLarge
      },
      {
        title: 'Pedidos em produção',
        type: status.inProgress,
        nextAction: status.outForDelivery,
        nextButtonTitle: 'Saiu para entrega',
        icon: Motorcycle
      },
      {
        title: 'Saiu para entrega',
        type: status.outForDelivery,
        nextAction: status.delivered,
        nextButtonTitle: 'Entregue',
        icon: Check
      },
      {
        title: 'Entregue',
        type: status.delivered
      }
    ]
  ), [status])
  function getHour (date) {
    const options = {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }
    return Intl.DateTimeFormat('pt-BR', options).format(date)
  }
  return allOrderStatus.map(orderStatus => (
    <TableContainer key={orderStatus.title}>
      <TableTitle>{orderStatus.title}</TableTitle>
      <Table>
        <THead>
          <TableRow>
            <Th>
              <Typography>
                Informações do Pedido
              </Typography>
            </Th>
            {orderStatus.nextAction &&
              <Th align='center'>
                <Typography>
                  Mudar Status
                </Typography>
              </Th>}
          </TableRow>
        </THead>
        <TableBody>
          {orders?.[orderStatus.type].length === 0 && (
            <TableRow>
              <TableCell>
                <Typography>
                  Nenhum pedido com esse status
                </Typography>
              </TableCell>
            </TableRow>
          )}
          {orders?.[orderStatus.type].map(order => {
            const {
              address,
              number,
              complement,
              district,
              city,
              state,
              code: cep
            } = order.address
            return (
              <TableRow key={order.id}>
                <TableCell>
                  <div>
                    <Subtitle>
                      Horario do pedido: {getHour(order.createdAt.toDate())}
                    </Subtitle>
                  </div>
                  <div>
                    <Subtitle>
                      Pedido:
                    </Subtitle>
                    <ul>
                      {order.pizzas.map((pizza, index) => (
                        <li key={index}>
                          <Typography>
                            {pizza.quantity} {' '}
                            {singularOrPlural(
                              pizza.quantity,
                              'pizza',
                              'pizzas'
                            )} {' '}
                            {pizza.size.name.toUpperCase()} de {' '}
                            {pizza.flavours
                              .map(flavour => flavour.name)
                              .reduce((acc, flavour, index, array) => {
                                if (index === 0) {
                                  return flavour
                                }
                                if (index === array.length - 1) {
                                  return `${acc} e ${flavour}`
                                }
                                return `${acc}, ${flavour}`
                              }, '')}
                          </Typography>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <Subtitle>
                      Endereço de entrega:
                    </Subtitle>
                    <Typography>
                      {address}, {number && `nº ${number}`} {' '}
                      {complement && `, ${complement}`} <br />
                      Bairro: {district} - CEP: {cep} <br />
                      {city} / {state}
                    </Typography>
                  </div>
                </TableCell>
                {orderStatus.nextAction &&
                  <TableCell align='center'>
                    <Fab
                      color='primary'
                      title={`Mudar status para ${orderStatus.nextButtonTitle}`}
                      onClick={() => updateOrder({
                        orderId: order.id,
                        status: orderStatus.nextAction
                      })}
                    >
                      <orderStatus.icon />
                    </Fab>
                  </TableCell>}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  ))
}
const Subtitle = styled(Typography).attrs({
  variant: 'button'
})`
  && {
    font-weight: bold;
  }
`
export default Orders
