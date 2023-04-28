import { Card, CardHeader, Grid } from "@mui/material";
import { Layout } from "src/components/layouts";
import { EntryList, NewEntry } from "src/components/ui";

export default function HomePage() {
  return (
    <Layout title="Home - OpenJira">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title="Pendientes" />
              {/**agrgar  una  nueva entrada */}
              {/**Listado de entradas */}
              <NewEntry/>
              <EntryList status="pending"/>
   
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title="En Progreso" />
      
              {/**agrgar  una  nueva entrada */}
              {/**Listado de entradas */}
           
              <EntryList status="in-progress"/>
 
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title="Completadas" />
 
              {/**agrgar  una  nueva entrada */}
              {/**Listado de entradas */}
              <EntryList status='finished'/>
       
          </Card>
        </Grid>
      </Grid>
    </Layout>
  )
}
