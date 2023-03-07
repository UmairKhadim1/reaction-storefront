import {Container, Grid, Hidden, Typography} from "@material-ui/core"
export default function Index() {
    return (
        <Container maxWidth="xl" className="FooterContainer__MainMaxWidth ContainerContent__MainMaxWidth">
        <div className="ContainerPages__MainMaxWidth">
          <div className="Footer__section5">
            <Grid container  className="Footer__download">
              <Hidden smDown>
                <Grid item sm={6} md={6} lg={6} className="Footer__downloadImg">
                  <img className="FooterSection5__image" src="/images/HomeMobile.png" title="Coming Soon"/>
                </Grid>
              </Hidden>

              <Grid item sm={8} md={6} lg={6} className="FooterSection5__contentContainer">
                <div className="FooterSection5__content">
                  <Typography variant="h2" className="FooterSection5__title">LOS App</Typography>
                  <Typography variant="h2" className="FooterSection5__title"> Coming Soon</Typography>
                  <div className="FooterSection5__subtitleBox">
                    <Typography variant="subtitle2" className="FooterSection5__subtitle">Great Deals on sneakers and accessories</Typography>
                    <Typography variant="subtitle2" className="FooterSection5__subtitle">Make offers on your most wanted styles</Typography>
                    <Typography variant="subtitle2" className="FooterSection5__subtitle"> Exclusive drops and collections</Typography>
                  </div>
                  <div className="dowload__sources">
                    <span className="dowloadSource__item" title="Coming Soon"><img src="/icons/ios_btn.svg" /> </span>
                    <span className="dowloadSource__item" title="Coming Soon"><img src="/icons/Android_btn.svg" /></span>
                  </div>
                </div>
              </Grid>
  
            </Grid>
          </div>
        </div>
      </Container>
    )
}
