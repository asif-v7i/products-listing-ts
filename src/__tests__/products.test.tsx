/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Products from '../pages/products/index';
import { fetchData } from '../utils/api';


jest.mock('../utils/api');
const data = [
  {
    "id": 1,
    "colour": "Black",
    "name": "Black Sheet Strappy Textured Glitter Bodycon Dress",
    "price": 10,
    "img": "http://cdn-img.prettylittlething.com/9/0/a/a/90aa90903a135ee59594f47c7685aa7ef3046e44_cly8063_1.jpg?imwidth=1024"
  },
  {
    "id": 2,
    "colour": "Stone",
    "name": "Stone Ribbed Strappy Cut Out Detail Bodycon Dress",
    "price": 4,
    "img": "https://cdn-img.prettylittlething.com/3/6/5/a/365a5d1dce6a2b77b564379b302c9d83afccf33b_cmd2051_1.jpg?imwidth=1024"
  },
  {
    "id": 3,
    "colour": "Black",
    "name": "Black Frill Tie Shoulder Bodycon Dress",
    "price": 7.99,
    "img": "https://cdn-img.prettylittlething.com/d/c/3/3/dc337260f9ecefdb99a8c8e98cd73ccb1b79cea5_cmb6804_4.jpg?imwidth=1024"
  },
  {
    "id": 5,
    "colour": "Red",
    "name": "Red Pin Stripe Belt T Shirt Dress",
    "price": 17,
    "img": "https://cdn-img.prettylittlething.com/f/7/1/8/f718a4011ddf92f48aeefff6da0f475178694599_cly0842_1.jpg?imwidth=1024"
  }
];
// (fetchData as jest.Mock).mockResolvedValue(data)

describe('Products', () => {

  beforeEach(() => {
    (fetchData as jest.Mock).mockResolvedValue(data);
  });

  test('PLT-1: Viewing product listings', async () => {
    await act(async () => {
      render(<Products />);
    });

    // Assuming each product item has a 'product-item' class
    const productItems = screen.getAllByTestId('product-item');
    expect(productItems).toHaveLength(4); // Replace 10 with the expected number of items
  });

  test('PLT-2: Filter by colour', async () => {
    await act(async () => {
      render(<Products />);
    });
    // Assuming the filter button has a 'filter-button' class
    await act(async () => {
      // Assuming each product item has a 'product-item' class
      const filter = screen.getByTestId('color-filter');
      fireEvent.change(filter, { target: { value: 'Black' } });

    });

    expect(screen.queryByText('Red Pin Stripe Belt T Shirt Dress')).not.toBeInTheDocument();
    expect(screen.getByText('Black Frill Tie Shoulder Bodycon Dress')).toBeInTheDocument();
    expect(screen.getByText('Black Sheet Strappy Textured Glitter Bodycon Dress')).toBeInTheDocument();
  });

  test('PLT-3: Add to cart', async () => {
    await act(async () => {
      render(<Products />);
    });
    await act(async () => {
      userEvent.click(screen.getByTestId('add-button-1'));
    });

    const basketQty = screen.getByTestId('quantity-1');
    expect(basketQty).toHaveTextContent("Qty: 1");
    const total = screen.getByTestId('total');
    expect(total).toHaveTextContent("Total: $10");
  });

  test('PLT-4: Reduce quantity', async () => {
    await act(async () => {
      render(<Products />);
    });
    await act(async () => {
      userEvent.click(screen.getByTestId('add-button-1'));
    });

    const basketQty = screen.getByTestId('quantity-1');
    expect(basketQty).toHaveTextContent("Qty: 1");
    const total = screen.getByTestId('total');
    expect(total).toHaveTextContent("Total: $10");
    await act(async () => {
      userEvent.click(screen.getByTestId('reduce-button-1'));
    });
    expect(basketQty).toHaveTextContent("Qty: 0");
    expect(total).toHaveTextContent("Total: $0");
  });

  test('PLT-5: Remove from basket', async () => {
    await act(async () => {
      render(<Products />);
    });
    await act(async () => {
      userEvent.click(screen.getByTestId('add-button-1'));
    });
    await act(async () => {
      userEvent.click(screen.getByTestId('add-button-1'));
    });

    const basketQty = screen.getByTestId('quantity-1');
    expect(basketQty).toHaveTextContent("Qty: 2");
    const total = screen.getByTestId('total');
    expect(total).toHaveTextContent("Total: $20");
    await act(async () => {
      userEvent.click(screen.getByTestId('remove-button-1'));
    });
    expect(basketQty).toHaveTextContent("Qty: 0");
    expect(total).toHaveTextContent("Total: $0");
  });
});