import {isMobile} from 'react-device-detect';
import DesktopCTA from './DesktopCTA';



const Service = (props) => {


	return (
		<section className="serivce-section bg-silver-light pdt-60 pdb-60" data-background="/images/about2Back.webp" style={{ backgroundImage: "url(/images/about2Back.webp)" }}>
			<div className="section-title">
				<div className="container">
					<div className="row">
						<div className="col-lg-8">
							<div className="section-title-left-part mrb-sm-15">
								<div className="section-left-sub-title mb-20">
									<h5 className="sub-title text-primary-color">مزایای سایت تامین پلاس</h5>
								</div>
								<h2 className="title">چرا از تامین پلاس استفاده کنیم؟</h2>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="section-content">
				<div className="container">
					<div className="row">
						{props.services.map(q => {
							return (
								<div className="col-md-6 col-xl-4">
									<div className="service-box">
										<div className="service-icon">
											<span className={`webexflaticon ${q.icon}`}></span>
										</div>
										<div className="service-content">
											<div className="title">
												{q.link ? <a href={`${q.link}`}><h3>{q.title}</h3></a> : <h3>{q.title}</h3>}												
											</div>
											<div className="para">
												<p>{q.abstract}</p>
											</div>
										</div>
									</div>
								</div>
							);
						})}
					</div>
					<DesktopCTA />
				</div>
			</div>
		</section>
	);
}

export default Service;