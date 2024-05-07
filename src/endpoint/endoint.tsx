interface Endpoints {
    slider: string | any
    nowShowing: string
    upComing: string
    movieCode: string
    seatSelection: string | any
    cinemas: string
    cinema: string
}
export const endpoints: Endpoints = {
    slider: process.env.App_Slider,
    nowShowing: `${process.env.Apiproxy_BaseUrl}/movies?version=3&site_id=6&channel=HTML5&child_site_id=370&city=nellore&mdp=1`,
    upComing: `${process.env.Apiproxy_BaseUpcommingUrl}?city=nellore&version=3&site_id=6&channel=HTML5&child_site_id=370`,
    movieCode: `${process.env.Apiproxy_BaseUrl}/movie?meta=1&reqData=1&city=nellore&`,
    seatSelection: process.env.App_SeatSelection,
    cinemas: `${process.env.Apiproxy_BaseUrl}/cinemas?version=3&site_id=6&channel=HTML5&child_site_id=370&city=nellore`,
    cinema: `${process.env.Apiproxy_BaseUrl}/cinema?meta=1&reqData=1&version=3&site_id=6&channel=web&child_site_id=370&`
}