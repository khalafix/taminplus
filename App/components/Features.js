
import Image from 'next/image';
import { withRouter } from 'next/router';
import { useEffect } from 'react';


const Features = ({router}) => {



    return (
        <section className="feature-section pdt-110 pdb-130 bg-silver-light bg-no-repeat" data-background="/images/featuresBack.png" style={{backgroundImage : "url(/images/featuresBack.png)"}}>
		<div className="container">
			<div className="row">
				<div className="col-md-6 col-xl-4">
					<div className="feature-box mrb-lg-60">
						<div className="feature-thumb">
							<Image className="img-full" src="/images/service.png" alt="" width={400} height={300} />
						</div>
						<div className="feature-content">
							<div className="title">
								<h3>طراحی خلاقانه</h3>
							</div>
							<div className="para">
								<p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد</p>
							</div>
							<div className="link">
								<a href="http://webextheme.com/html/novaly-html/v2/#"><i className="fas fa-long-arrow-alt-right"></i></a>
							</div>
						</div>
					</div>
				</div>
				<div className="col-md-6 col-xl-4">
					<div className="feature-box mrb-lg-60">
						<div className="feature-thumb">
							<Image className="img-full"  src="/images/service.png" alt="" width={400} height={300} />
						</div>
						<div className="feature-content">
							<div className="title">
								<h3>طراحی خلاقانه</h3>
							</div>
							<div className="para">
								<p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد</p>
							</div>
							<div className="link">
								<a href="http://webextheme.com/html/novaly-html/v2/#"><i className="fas fa-long-arrow-alt-right"></i></a>
							</div>
						</div>
					</div>
				</div>
				<div className="col-md-6 col-xl-4">
					<div className="feature-box">
						<div className="feature-thumb">
							<Image className="img-full"  src="/images/service.png" alt="" width={400} height={300} />
						</div>
						<div className="feature-content">
							<div className="title">
								<h3>طراحی خلاقانه</h3>
							</div>
							<div className="para">
								<p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد</p>
							</div>
							<div className="link">
								<a href="http://webextheme.com/html/novaly-html/v2/#"><i className="fas fa-long-arrow-alt-right"></i></a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
    )
}

export default withRouter(Features);