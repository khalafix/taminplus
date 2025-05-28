
import { useEffect, useState } from 'react';
import { getUserOrders } from 'lib/api';
import { getUserid } from "helpers/Helpers"
import { useRouter } from 'next/router';
import Link from 'next/link';
var moment = require('jalali-moment');

const Dashboard = (props) => {

    const router = useRouter();
    let [infos, setInfos] = useState([]);

    useEffect(async () => {
        // if (!getUserid()) {
        //     return router.push("/auth");
        // }
        // var infos = await getUserOrders(getUserid());

        // setInfos(infos);
    }, []);



    return (
        <section className="team-details-page " data-background="/images/articleBack.webp" style={{ backgroundImage: "url(/images/articleBack.webp)" }}>
            <div className="container">
                {/* <div className="row">
                    <div className="col-md-12 col-sm-12 col-lg-10 mx-auto ">
                        <div className="personal-details">
                            <h3 className="personal-details-title title-under-line mrb-60">لیست دوره های خریداری شده</h3>
                        </div>
                        {infos.length == 0 ? <div>
                            <div class="p-4 mb-4 bg-light text-dark">
                                شما دوره ای را خریداری نکرده اید.
                               
                            </div>
                            <div className="w-100 text-center">
                            <Link href="/courses">
                                    <a href="#" className="cs-btn-one btn-gradient-color btn-sm mx-auto">لیست دوره های آموزشی</a>
                                </Link>
                            </div>
                        </div> :
                            <table className="order-table table table-striped table-hovered">
                                <thead>
                                    <tr>
                                        <th>ردیف</th>
                                        <th>عنوان دوره</th>
                                        <th>تاریخ خرید</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {infos.map((q, index) => {
                                        return (
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{q.title.replace("-", "\n")}</td>
                                                <td>{moment(q.paymentDate).locale('fa').format('YYYY/MM/DD')}</td>
                                                <td>
                                                    <Link href={q.type == "Course" ? `/courses/${q.id}` : `/courses/${q.courseId}/${q.id}`}>
                                                        <a href="#" className="btn cs-btn-one btn-gradient-color text-white btn-xs  text-small  mx-auto">مشاهده</a>
                                                    </Link>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>}
                    </div>
                </div> */}
            </div>
        </section>
    )
}





export default Dashboard;