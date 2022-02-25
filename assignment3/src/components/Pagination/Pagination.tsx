// module imports
import { Component } from 'react'

type Paginate = {
  postsPerPage: number
  totalPosts: number
  paginate: Function
}

class Pagination extends Component<Paginate> {
  render() {
    const pageNumbers = []

    for (
      let i = 1;
      i <= Math.ceil(this.props.totalPosts / this.props.postsPerPage);
      i++
    ) {
      pageNumbers.push(i)
    }
    return (
      <nav>
        <ul className='pagination'>
          {pageNumbers.map((number) => (
            <li key={number} className='page-item'>
              <button
                onClick={() => this.props.paginate(number)}
                // href='!#'
                className='page-link'
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    )
  }
}

export default Pagination
