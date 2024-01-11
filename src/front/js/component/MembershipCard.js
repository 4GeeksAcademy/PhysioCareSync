import React from 'react';
import '../../styles/MembershipCard.css';

const MembershipCard = () => {
  return (
    <div className="membershipCardContainer">
      <div className="property1defaultAlt">
        <div className="copyComponent">
          <div className="headingText">
            <h1 className="heading">Pago único, visibilidad ilimitada</h1>
            <h3 className="subheading">La visibilidad, tu ventaja competitiva: Realiza el pago ahora</h3>
          </div>
        </div>
      </div>

      <div className="newProperty1DefaultAlt">
        <div className="newCopyComponent">
          <h1 className="newTitle">Pro</h1>
          <p className="newShortDescription">For small healthcare businesses</p>
          <div className="newPrice1">
            <div className="newPrice2">
              <b className="newB">$50</b>
              <b className="newB2">99</b>
            </div>
            <div className="newDetailsContainer">
              <div className="newPerMonth">per month</div>
              <div className="newYearlySwitch1">
                <div className="newPerMonth">yearly</div>
                <div className="newSwitch">
                  <div className="newCircle" />
                </div>
              </div>
            </div>
          </div>
          <div className="newFeatureList1">
            <div className="newListItem">
              <img className="newCheckcircleIcon" alt="" src="/checkcircle--icon@2x.png" />
              <div>Unlimited Clients</div>
            </div>
            <div className="newListItem">
              <img className="newCheckcircleIcon5" alt="" src="/checkcircle--icon@2x.png" />
              <div>Unlimited Storage</div>
            </div>
            <div className="newListItem">
              <img className="newCheckcircleIcon5" alt="" src="/checkcircle--icon@2x.png" />
              <div>24/7 Dedicated Support</div>
            </div>
            <div className="newListItem">
              <img className="newCheckcircleIcon5" alt="" src="/checkcircle--icon@2x.png" />
              <div>Custom Integrations</div>
            </div>
          </div>
          <div className="newTag">
            <div className="newBestDeal">Best Deal</div>
          </div>
          <button className="newButton1">
            <div className="newTextContainer">
              <div className="newCta1">Join Now</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MembershipCard;
