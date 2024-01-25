import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import axios from 'axios';
import { createDetail } from '../../../../redux/actions/action';
import styles from "./MySales.module.css";


const MySales = () => {
  const dispatch = useDispatch();
  const [sales, setSales] = useState([]);
  const [visibleSaleDetails, setVisibleSaleDetails] = useState({});
  const idUser = localStorage.getItem('userId');
  const cartItemsJSON = localStorage.getItem('cartItems');

  const listProducts = JSON.parse(cartItemsJSON) || [];
  console.log(listProducts);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://surf-4i7c.onrender.com/surf/sale');
        const { data } = response;
        console.log('Sales data:', data);
  
        const filteredSales = data.data ? data.data.filter(sale => sale.idUser === parseInt(idUser)) : [];
        console.log('Filtered Sales:', filteredSales);
  
        if (filteredSales.length > 0) {
          await Promise.all(filteredSales.map(async sale => {
            try {
              console.log(`Dispatching createDetail for sale ${sale.idSale}`);
              await dispatch(createDetail(sale.idSale, idUser, listProducts));
              console.log(`createDetail for sale ${sale.idSale} successful`);
            } catch (error) {
              console.error(`Error creating detail for sale ${sale.idSale}:`, error);
            }
          }));
        }
        await handleRemoveAllProducts();
        setSales(filteredSales);
      } catch (error) {
        console.error('Error fetching sales:', error);
      }
    };
    
    fetchData();
    
  }, [idUser]);

  const handleRemoveAllProducts = async () => {
    try {
      await axios.delete(`https://surf-4i7c.onrender.com/surf/cart/${idUser}`);
      
    } catch (error) {
      console.error('Error al eliminar todos los productos del carrito:', error);
    }
  };

  const handleViewMoreClick = async (sale) => {
    try {
      const response = await axios.get(`https://surf-4i7c.onrender.com/surf/detail/${sale.idSale}`);
      const { data } = response;
      console.log(data);
      
      if (data && data.data) {
        setVisibleSaleDetails({
          ...visibleSaleDetails,
          [sale.idSale]: data.data,
        });
      }
    } catch (error) {
      console.error('Error fetching sale details:', error);
    }
  };

  const handleCloseDetailsClick = (sale) => {
    setVisibleSaleDetails({
      ...visibleSaleDetails,
      [sale.idSale]: null,
    });
  };

  return (
    <div className={styles.fuente}>
      <h1>My Sales</h1>
      {sales.length === 0 ? (
        <p>No hay ventas disponibles</p>
      ) : (
        <div className={styles.mainInfo}>
          <ul>
            {sales.map((sale) => (
              <li key={sale.idSale}>
                <br />
                <hr />  
                <strong>ID de Venta:</strong> {sale.idSale}
                <br />
                <br />
                <strong>Usuario:</strong> {sale.nameUser}
                <br />
                <br />
                <strong>Email:</strong> {sale.emailUser}
                <br />
                <br />
                <strong>Fecha:</strong> {new Date(sale.date).toLocaleString()}
                <br />
                <br />
                <strong>Costo:</strong> ${sale.costSale.toFixed(2)}

                <button className={styles.verMas} onClick={() => handleViewMoreClick(sale)}>Ver Más</button>
                <hr />

                {visibleSaleDetails[sale.idSale] && (
                  <div>
                    <h2>Detalles de la Venta</h2>
                    <div className={styles.details}>
                      <ul>
                        {visibleSaleDetails[sale.idSale].map((detail) => (
                          <li key={detail.idProduct}>
                            <img src={detail.image} alt="product" />
                            <p><strong>Producto:</strong> {detail.name}</p>
                            <p><strong>Descripcion:</strong> {detail.description}</p>
                            <p><strong>Color:</strong> {detail.nameColor}</p>
                            <p><strong>Talle:</strong> {detail.nameSize}</p>
                            <p><strong>Cantidad:</strong> {detail.amount}</p>
                            <p><strong>Precio:</strong> ${detail.priceProductUnit}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button className={styles.verMenos} onClick={() => handleCloseDetailsClick(sale)}>Ver Menos</button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MySales;