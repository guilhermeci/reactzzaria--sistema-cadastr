import { useEffect, useState, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { db } from 'services/firebase'
import { useMounted } from 'hooks'

function useCollection (collection) {
  // dados para serem setados
  const [data, setData] = useState(null)

  // mounted para verificar se o componente já está montado
  const mounted = useMounted()

  // necessário para atualizar a página sempre que o pathname mudar
  const { pathname } = useLocation()

  // função para atualizar o formulário quando excluir
  const fetchCollectionData = useCallback(() => {
    db.collection(collection).get().then(querySnapshot => {
      const docs = []
      querySnapshot.forEach(doc => {
        docs.push({
          id: doc.id,
          ...doc.data()
        })
      })
      if (mounted.current) {
        setData(docs)
      }
    })
  }, [collection, mounted])

  //
  // função para adicionar
  const add = useCallback((data) => {
    return db.collection(collection).add(data)
  }, [collection])

  //
  // função para deletar um registro
  const remove = useCallback(async (id) => {
    await db.collection(collection).doc(id).delete()
    fetchCollectionData()
  }, [collection, fetchCollectionData])
  //
  // transaction - remover tamanho de pizza
  const removePizzaSize = useCallback(async (id) => {
    const pizzaSizeRef = db.collection('pizzasSizes').doc(id)
    console.log('pizzaSizeRef', pizzaSizeRef)
    db.runTransaction(async (transaction) => {
      const sizeDoc = await transaction.get(pizzaSizeRef)
      if (!sizeDoc.exists) {
        throw new Error('Este tamanho não existe!')
      }
      transaction.delete(pizzaSizeRef)
      const allFlavours = await db.collection('pizzasFlavours').get()
      allFlavours.forEach(flavours => {
        const { [id]: sizeId, ...value } = flavours.data().value
        const flavourRef = db.collection('pizzasFlavours').doc(flavours.id)
        transaction.update(flavourRef, { value })
      })
    })
      .then(() => {
        console.log('finalizou transaction com sucesso')
        fetchCollectionData()
      })
      .catch((e) => console.log('error na transaction', e))
  }, [fetchCollectionData])
  //
  // funão de edição
  const edit = useCallback((id, data) => {
    return db.collection(collection).doc(id).set(data)
  }, [collection])
  //
  // função para carregar dados
  useEffect(() => {
    fetchCollectionData()
  }, [pathname, fetchCollectionData])

  return { data, add, edit, remove, removePizzaSize }
}
export default useCollection
