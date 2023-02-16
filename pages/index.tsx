import { NextPage } from 'next'

import { Layout } from '@/components/layouts'
import { Typography } from '@mui/material'

const Home: NextPage = () => {
  return (
    <Layout>
      <Typography
        variant='h1'
        color='primary' 
        >
          H0l4 p3 kaunza
      </Typography>
    </Layout>
  )
}

export default Home