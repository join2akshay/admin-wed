import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'

import ItemList from './itemList'
import './style.css'
import SubcategoryList from './subcategoryList'

export default function Admin() {
  return (
    <div class="with-sidebar">
      <div>
        <div className="wrapper">
          <div className="sidebar">
            <ul className="nav">
              <li>
                <Link to="/admin/category">Category</Link>
              </li>
              <li>
                <Link to="/admin/subcategory">Subcategory</Link>
              </li>
              <li>
                <Link to="/settings">User</Link>
              </li>
              <li>
                <Link to="/settings">Item</Link>
              </li>
              <li>
                <Link to="/settings">Vendor</Link>
              </li>
            </ul>
          </div>
        </div>


      </div>
      <div>

        jskldj

         </div>
    </div>
  )
}
