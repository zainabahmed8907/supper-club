import { fetchDynamicContent } from "@/lib/utils";
import Link from "next/link";
import { marked } from "marked";

export default async function TermsConditions() {
  const contents = await fetchDynamicContent("terms-conditions");
  const terms = contents?.data?.data[0] || null;
  marked.use({
    breaks: true
  });
  const html =
    terms?.attributes?.Markdown.length > 0 &&
    marked(terms?.attributes?.Markdown.replaceAll("\n", "&nbsp;\n"), {
      headerIds: false,
      mangle: false,
    });
  return (
    <>
      <div className="h-48 5xl:h-52 w-full flex items-center bg-secondary">
        <p
          className="text-primary font-semibold
                pt-20
              
                text-xl lg:text-2xl xl:text-4xl 3xl:text:5xl 5xl:text-5xl

                pl-10 xl:px-20 lg:px-20
                 "
        >
          Terms and Conditions
        </p>
      </div>

      <div className="pt-10 xl:px-20 px-10">
        {html ? (
          <div className="">
            <article dangerouslySetInnerHTML={{ __html: html }}></article>
          </div>
        ) : (
          <>
            <p className="font-bold text-base mb-4">
              Introduction to Terms and Conditions
            </p>
            <p className="text-base mb-4">
              These Terms and Conditions apply between all Users of this Website
              (including but not limited to Members), and Supperclubme Now
              Portal, the owner(s) of this Website. Additionally these Terms and
              Conditions apply to the use of and (where applicable) purchase of
              Membership and Services. Please read these Terms and Conditions
              carefully, as they affect your legal rights.
            </p>
            <p className="font-bold text-base mb-4">
              1. Definitions and Interpretations
            </p>
            <div className="xl:pl-6">
              <p className="text-base mb-4 leading-7">
                1.1. Throughout these Terms and Conditions, the following words
                will have the meanings set against them:
              </p>
              <p className="text-base mb-4 leading-7">
                “AED” means United Arab Dirhams, or the lawful currency for the
                time being in the UAE;
              </p>
              <p className="text-base mb-4 leading-7">
                “Business Day” means a day that is not a Saturday or Sunday or
                any other day which is declared by the UAE government to be a
                holiday for the private sector in the UAE;
              </p>
              <p className="text-base mb-4 leading-7">
                “Content” means any text, graphics, images, audio, video,
                software, data compilations, page layout, underlying code and
                software and any other form of information capable of being
                stored in a computer that appears on or forms part of this
                Website;
              </p>
              <p className="text-base mb-4 leading-7">
                “Corporate Member” has the meaning set out in Clause 10;
              </p>
              <p className="text-base mb-4 leading-7">
                “DIFC” means the Dubai International Financial Centre;
              </p>
              <p className="text-base mb-4 leading-7">
                “DIFC” means the Duba“DIFC-LCIA” means the Dubai International
                Financial Centre London Court of International Arbitration; i
                International Financial Centre;
              </p>

              <p className="text-base mb-4 leading-7">
                “Members” means Users who have an active subscription to a
                Membership;
              </p>
              <p className="text-base mb-4 leading-7">
                “Membership” means subscription as a Member entitling the User
                to receive the Digital Membership Access and benefit from the
                Services;
              </p>
              <p className="text-base mb-4 leading-7">
                “Membership Access” means Supperclubme digital membership access
                issued to the relevant Member(s) as part of a subscription
                package upon registering as a Member, receipt of which entitles
                the Member to use of the Services;
              </p>
              <p className="text-base mb-4 leading-7">
                “Membership Fee(s)” means the fee payable by a Member, as may be
                determined from time to time, in exchange for Membership
                pursuant to Clause 13.1;
              </p>
              <p className="text-base mb-4 leading-7">
                “Privacy Policy” means the policy relating to privacy and date
                use found on the Privacy Policy web page;
              </p>
              <p className="text-base mb-4 leading-7">
                “Services” means, collectively or individually as appropriate,
                any of the following:
              </p>
              <p className="text-base mb-4 leading-7">
                access for Members to the restaurants and outlets set out on the
                restaurants and outlets web page set out against each restaurant
                or outlet;
              </p>
              <p className="text-base mb-4 leading-7">
                each in accordance with these Terms and Conditions;
              </p>
              <p className="text-base mb-4 leading-7">
                “Service Providers” means the hotels, restaurants and outlets
                providing one or more of the Services;
              </p>
              <p className="text-base mb-4 leading-7">
                “UAE” means the United Arab Emirates;
              </p>
              <p className="text-base mb-4 leading-7">
                “User” means any and all persons who access the Website and use
                the Services or receive Membership Cards; and
              </p>
              <p className="text-base mb-4 leading-7">
                “Website” means this website; www.supperclubme.com, and any
                sub-domaines of this site, owned by{" "}
                <Link href="" className="text-primary">
                  Supperclubme Now Portal
                </Link>
                , unless expressly excluded by their own terms and conditions.{" "}
              </p>
            </div>
            <p className="font-bold text-base mb-4">2. Acceptance of Terms</p>
            <div className="xl:pl-6">
              <p className="text-base mb-4 leading-7">
                2.1. Your agreement to comply with and be bound by these Terms
                and Conditions is deemed to occur upon your first use of the
                Website. Your access to and use of the Website and/or Services
                is subject (unless expressly stated otherwise) exclusively to
                these Terms and Conditions. You will not use the Website for any
                purpose that is unlawful or prohibited by these Terms and
                Conditions or by applicable law. By using the Website you are
                fully accepting the terms, conditions and disclaimers contained
                in these Terms and Conditions. If you do not agree to be bound
                by these Terms and Conditions, you should stop using the
                Website, the Membership Card and/or the Services immediately.
              </p>
              <p className="text-base mb-4 leading-7">
                2.2. Supperclubme Now Portal reserves the right to change these
                Terms and Conditions without notice, and Users agree to be bound
                by such changes. It is the responsibility of Users to check
                these Terms and Conditions regularly for any changes.
              </p>
              <p className="text-base mb-4 leading-7">
                2.3. If you are entering into these Terms and Conditions on
                behalf of your employer or a third party or acting as an
                employee, you warrant that you are authorized to enter into
                legally binding contracts on behalf of your employer or the
                third party. You further warrant that your employer or third
                party agrees to be bound by these Terms and Conditions.
              </p>
            </div>

            <p className="font-bold text-base mb-4">
              3. Intellectual Property and Acceptable Use of Content
            </p>
            <div className="xl:pl-6">
              <p className="text-base mb-4 leading-7">
                3.1. All Content included on the Website, unless uploaded by
                Service Providers or as stated otherwise, is the property of
                Supperclubme Now Portal, our affiliates, licensees or other
                relevant third parties. By continuing to use the Website Users
                acknowledge that such Content is protected by copyright,
                trademarks, database rights and other intellectual property
                rights. Nothing on this site shall be construed as granting, by
                implication, estoppel, or otherwise, any license or right to use
                any trademark, logo or service mark displayed on the site
                without the owner’s prior written permission.
              </p>
              <p className="text-base mb-4 leading-7">
                3.2. Subject to Clause 4, Supperclubme Now Portal hereby grants
                to the User a non-exclusive license for the duration of the
                Membership or in the case of a User who is not a Member, until
                Supperclubme Now Portal may choose to revoke such license, to
                download, store, use, reproduce, transmit, display, copy and
                provide access to Content in accordance with the terms of the
                Membership (where applicable) and at all times only for the
                User’s own information purposes and for the avoidance of doubt,
                not for any commercial or business purposes.
              </p>
              <p className="text-base mb-4 leading-7">
                3.2. Subject to Clause 4, Supperclubme Now Portal hereby grants
                to the User a non-exclusive license for the duration of the
                Membership or in the case of a User who is not a Member, until
                Supperclubme Now Portal may choose to revoke such license, to
                download, store, use, reproduce, transmit, display, copy and
                provide access to Content in accordance with the terms of the
                Membership (where applicable) and at all times only for the
                User’s own information purposes and for the avoidance of doubt,
                not for any commercial or business purposes.
              </p>
              <p className="text-base mb-4 leading-7">
                3.3. Without prejudice to any rights granted herein,
                Supperclubme Now Portal reserves the right to amend, edit or
                abbreviate or take down any Content at its discretion.
              </p>
              <p className="text-base mb-4 leading-7">
                3.4. The names, images and logos identifying
                www.supperclubme.com, or Supperclubme Now Portal or third
                parties, including the Service Providers, and their products and
                services are subject to copyright, design rights and trade marks
                of Supperclubme Now Portal and/or the relevant third parties.
                Nothing contained in these terms shall be construed as
                conferring any licence or right to use any trade mark, design
                right, name or copyright of{" "}
                <Link href="" className="text-primary">
                  {" "}
                  Supperclubme Now Portal{" "}
                </Link>
                or any other third party.{" "}
              </p>
            </div>

            <p className="font-bold text-base mb-4">
              4. Prohibited Use of the Site by Users
            </p>

            <div className="xl:pl-6">
              <p className="text-base mb-4 leading-7">
                Users are expressly forbidden to download, store, reproduce,
                transmit, display (including without limitation via an intranet
                or extranet site), copy, sell publish, distribute, provide
                access to Content for any purposes other than as set out herein
                or to sub-license, rent, lease, transfer or assign any rights in
                Content, to any other person, commercially exploit or use
                Content for any unlawful purpose.
              </p>
            </div>

            <p className="font-bold text-base mb-4">
              5. Availability of the Website and Disclaimers
            </p>

            <div className="xl:pl-6">
              <p className="text-base mb-4 leading-7">
                5.1. The Website and Services are provided “as is” and on an “as
                available” basis. Supperclubme Now Portal gives no warranty that
                the Website or Services will be free of defects and/or faults.
                To the maximum extent permitted by law, Supperclubme Now Portal
                provides no warranties (express or implied) of fitness for a
                particular purpose, accuracy of information, compatibility and
                satisfactory quality. Supperclubme Now Portal is under no
                obligation to update information on the Website.{" "}
              </p>
              <p className="text-base mb-4 leading-7">
                5.2. Whilst Supperclubme Now Portal uses reasonable endeavours
                to ensure that the Website is secure and free of errors, viruses
                and other malware, Supperclubme Now Portal gives no warranty or
                guarantee in that regard and all Users take responsibility for
                their own security, that of their personal details and their
                computers.
              </p>
              <p className="text-base mb-4 leading-7">
                5.3. Supperclubme Now Portal accepts no liability for any
                disruption or non-availability of the Website.
              </p>
              <p className="text-base mb-4 leading-7">
                5.4. Supperclubme Now Portal reserves the right to alter,
                suspend or discontinue any part (or the whole of) the Website
                including, but not limited to, any products and/or services
                available. These Terms and Conditions shall continue to apply to
                any modified version of the Website unless it is expressly
                stated otherwise.
              </p>
              <p className="text-base mb-4 leading-7">
                5.5. Members hereby acknowledge and accept that Membership does
                not guarantee access to any individual Services or the Services
                at any given time or day. Access to the Services operates on a
                reservation only basis and, if an individual Service is fully
                utilized by other Members, no additional Members will be
                provided said Service until Members using that Service have
                stopped doing so.{" "}
              </p>
            </div>
            <p className="font-bold text-base mb-4">
              6. Limitation of Liability
            </p>

            <div className="xl:pl-6">
              <p className="text-base mb-4 leading-7">
                6.1. Supperclubme Now Portal will not be liable to Users in
                respect of any losses arising out of events beyond Supperclubme
                Now Portal reasonable control.
              </p>
              <p className="text-base mb-4 leading-7">
                6.2. To the maximum extent permitted by law, Supperclubme Now
                Portal accepts no liability for any of the following:{" "}
              </p>
              <p className="text-base mb-4 leading-7">
                6.2.1. Any business losses, such as loss of profits, income,
                revenue, anticipated savings, business, contracts, goodwill or
                commercial opportunities;{" "}
              </p>
              <p className="text-base mb-4 leading-7">
                6.2.2. Loss or corruption of any data, database or software;
              </p>
              <p className="text-base mb-4 leading-7">
                6.2.3. Any special, indirect or consequential loss or damage;
              </p>
              <p className="text-base mb-4 leading-7">
                6.2.4. Losses suffered by third parties,
              </p>
              <p className="text-base mb-4 leading-7">
                as a result of the use by Users of the Website or the Services.
              </p>
            </div>

            <p className="font-bold text-base mb-4">
              7. Website Content and Services
            </p>
            <div className="xl:pl-6">
              <p className="text-base mb-4 leading-7">
                7.1. Except as otherwise expressly agreed by Supperclubme Now
                Portal in writing, information regarding Supperclubme.com
                Membership Cards and Services is subject to change without
                notice.
              </p>
              <p className="text-base mb-4 leading-7">
                7.2. Information about Supperclubme.com Membership Cards and
                Services made available on and/or through this Website shall not
                constitute a representation, warranty or other commitment by
                Supperclubme Now Portal with respect to any product or service
                unless otherwise expressly agreed to by Supperclubme Now Portal
                in writing.{" "}
              </p>

              <p className="text-base mb-4 leading-7">
                7.3. Without limiting the generality of the foregoing,
                Supperclubme Now Portal hereby disclaims all warranties, express
                or implied, as to accuracy, suitability for any purpose or
                completeness of any Content, Membership Cards or Services.
              </p>
            </div>
            <p className="font-bold text-base mb-4">9. Membership</p>
            <div className="xl:pl-6">
              <p className="text-base mb-4 leading-7">
                9.1. Subscription to any Membership Card is subject to
                acceptance of these Terms and Conditions, the Privacy Policy and
                specifically the following:{" "}
              </p>
              <p className="xl:pl-6 pl-2 mb-4 leading-7">
                9.1.1. In order to become a Member, User’s are required to
                complete an online registration form. The User represents and
                warrants that the information given in that registration form
                will be truthful, accurate and complete. Supperclubme Now Portal
                will hold all such information in accordance with the terms of
                Supperclubme Now Portal Privacy Policy and it may be used to
                validate registration for Membership;
              </p>
              <p className="xl:pl-6 pl-2 mb-4 leading-7">
                9.1.2. Any subscriptions to Membership Access are deemed to
                commence from the date of receipt of User’s completed order,
                registration form or online registration and payment of the
                Membership Fee;
              </p>
              <p className="xl:pl-6 pl-2 mb-4 leading-7">
                9.1.3. Unless otherwise terminated in accordance with these
                Terms and Conditions, prior to the end of the validity period,
                Membership will be automatically renewed unless the Member has
                cancelled the auto-renewal option.
              </p>
              <p className="text-base mb-4 leading-7">
                9.2. Each Membership Access shall be valid for the term
                indicated thereon, unless earlier cancelled or suspended by
                Supperclubme Now Portal at the request of the Member or as
                otherwise permitted under these Terms and Conditions.
              </p>
              <p className="text-base mb-4 leading-7">
                9.3. Supperclubme Now Portal reserves the right to cancel a
                Member’s Membership, immediately and without notice, in the
                following circumstances:
              </p>
              <p className="xl:pl-6 pl-2 mb-4 leading-7">
                9.3.1. The Member fails to pay the Membership Fee prior to use
                of the Services or such payment is in any way rendered void
                following payment;
              </p>
              <p className="xl:pl-6 pl-2 mb-4 leading-7">
                9.3.2. the Member breaches the terms and conditions imposed on
                use of the Services by the Service Provider providing such
                Services; or{" "}
              </p>
              <p className="xl:pl-6 pl-2 mb-4 leading-7">
                9.3.3. the Member is otherwise in breach of any obligation in
                these Terms and Conditions.
              </p>
              <p className="text-base mb-4 leading-7">
                9.4. To cancel any Membership, Member’s must contact{" "}
                <span className="text-primary underline">
                  support@supperclubme.com
                </span>{" "}
                and upon verification that no successful bookings have been
                completed and the Membership subscription is still within the
                validity period. The purchase price will not be refunded to the
                purchaser.
              </p>
              <p className="text-base mb-4 leading-7">
                9.5. Members shall not, under any circumstances, copy or seek to
                copy the Membership Access, obtain any of the Services by
                fraudulent means or assist others to copy the Membership Access
                or obtain the Services by fraudulent means.
              </p>
              <p className="text-base mb-4 leading-7">
                9.6. Separately and in addition to these Terms and Conditions,
                when using any Service, Members agree to be bound by the terms
                and conditions imposed by the Service Provider providing that
                Service as such terms and conditions are made available by the
                relevant Service Provider.
              </p>
              <p className="text-base mb-4 leading-7">
                9.7. When using any Service, Members shall at all times:9.7.
                When using any Service, Members shall at all times:
              </p>
              <p className="xl:pl-6 pl-2 mb-4 leading-7">
                9.7.1 behave with decorum and in a manner appropriate to the
                settings of the restaurant or outlet (as applicable)
              </p>
              <p className="xl:pl-6 pl-2 mb-4 leading-7">
                9.7.2 not disrupt the enjoyment of other users of the restaurant
                or outlet (as applicable); and
              </p>
              <p className="xl:pl-6 pl-2 mb-4 leading-7">
                9.7.3 not behave in any way which brings the Impact name into
                disrepute.
              </p>
            </div>
            <p className="font-bold text-base mb-4">10. Corporate Members</p>
            <div className="xl:pl-6">
              <p className="text-base mb-4 leading-7">
                10.1. Membership and access to the Supperclubme Now Portal
                Services may be purchased by companies on behalf of or for the
                benefit of their employees (each such a company being a
                “Corporate Member”). In such case, the Corporate Member will be
                liable for the actions of its employees when using this Website
                and the Services as though the Corporate Member was itself using
                this Website or the Services.{" "}
              </p>
              <p className="text-base mb-4 leading-7">
                10.2. The Corporate Member will use its best endeavours to
                ensure that its employees that use this Website or the Services
                are made aware of and adhere to these Terms and Conditions and
                are subject to the obligations herein as though the employee was
                itself the Member.{" "}
              </p>
              <p className="text-base mb-4 leading-7">
                10.3. The Corporate Member shall indemnify and shall keep
                indemnified Supperclubme Now Portal against all expenses, costs,
                claims, proceedings, damage and loss arising out of or in
                connection with any breach or non-performance of these Terms and
                Conditions by the Corporate Member and/or its employees or any
                act or omission by the Corporate Member and/or its employees.
              </p>
            </div>

            <p className="font-bold text-base mb-4">11. Pricing</p>
            <div className="xl:pl-6">
              <p className="text-base mb-4 leading-7">
                11.1 The description of any Membership, including the Membership
                Fee, purchased hereunder will be confirmed at point of payment
                online.
              </p>
              <p className="text-base mb-4 leading-7">
                11.2. Prices for any{" "}
                <span className="text-primary underline">supperclubme.com</span>{" "}
                Services or Membership Access are subject to change without
                prior notice. Supperclubme Now Portal aim to regularly update
                all publicly available sources of price information via the
                Website to ensure that you have accurate information available
                to you when you purchase.
              </p>
            </div>
            <p className="font-bold text-base mb-4">
              12. Payment of the Membership Fee
            </p>

            <div className="xl:pl-6">
              <p className="text-base mb-4 leading-7">
                12.1. The Membership Fee must be paid in advance of a Membership
                Access being issued and the Services being used.
              </p>
              <p className="xl:pl-6 pl-2 mb-4 leading-7">
                12.1.1. The Membership fee is paid upfront. Refunds are
                unavailable. If you wish to transfer your membership to another
                party, you may do so so long as the account is in active status
                by emailing{" "}
                <span className="text-primary underline">
                  support@supperclubme.com
                </span>{" "}
                with new parties contact details and your written consent to
                transfer the existing membership to the second party.
              </p>
              <p className="text-base mb-4 leading-7">
                12.2. Membership Fee(s) are payable in AED and may be paid by
                credit card. Corporate members may pay via bank transfer
                according to separate agreement with Supperclubme Now Portal.
              </p>
              <p className="text-base mb-4 leading-7">
                12.3. The credit card used for the initial payment of your{" "}
                <span className="text-primary underline">supperclubme.com</span>{" "}
                membership will be kept on file with our chosen payment
                processor for the duration of your membership. If you wish to
                remove your credit card information, please email
                support@supperclubme.com.
              </p>
              <p className="text-base mb-4 leading-7">
                12.4. The owner of the credit card will be liable for any
                additional fees or charges applicable for the duration of the
                membership
              </p>
              <p className="text-base mb-4 leading-7">
                12.5. All membership fees are exclusive of VAT and other sales
                or indirect taxes which may be due or introduced as a result of
                changes to Federal Law. If any such taxes are payable on
                payments under these Terms and Conditions, then Supperclubme Now
                Portal reserves the right to collect these taxes from the
                Member.
              </p>
            </div>
            <p className="font-bold text-base mb-4">13. Product Delivery</p>

            <div className="xl:pl-6">
              <p className="text-base mb-4 leading-7">
                13.1. Each Member will be entitled to a Digital Membership
                Account.
              </p>
              <p className="text-base mb-4 leading-7">
                13.2. In order for Supperclubme Now Portal to produce the
                Digital Membership Account, each Member shall provide the
                following details to Supperclubme Now Portal in relation to the
                Member:
              </p>
              <p className="xl:pl-6 pl-2 mb-4 leading-7">13.2.1. name;</p>
              <p className="xl:pl-6 pl-2 mb-4 leading-7">
                13.2.2. current residential address;
              </p>
              <p className="xl:pl-6 pl-2 mb-4 leading-7">
                13.2.3. date of birth;
              </p>
              <p className="xl:pl-6 pl-2 mb-4 leading-7">
                13.2.4. email address;
              </p>
              <p className="xl:pl-6 pl-2 mb-4 leading-7">
                13.2.5. telephone number;
              </p>
              <p className="xl:pl-6 pl-2 mb-4 leading-7">
                13.2.6.credit card details.
              </p>
              <p className="text-base mb-4 leading-7">
                13.3. Digital Membership Account access is delivered via email
                once online payment has been completed.
              </p>
            </div>
            <p className="font-bold text-base mb-4">14. Guest Access</p>
            <div className="xl:pl-6">
              <p className="text-base mb-4 leading-7">
                14.1. Member’s shall have the option to purchase additional
                Digital Membership Accounts which shall be valid for use by
                guests of the member (“Guests”) excluding public holidays
              </p>
              <p className="text-base mb-4 leading-7">
                14.2. Guests shall provide to Supperclubme Now Portal the same
                details as are required of Members as set out in Clause 15.2 and
                shall be presented with their own Digital Membership Account
                access.
              </p>
              <p className="text-base mb-4 leading-7">
                14.3. Members shall be liable for the actions of their Guests,
                when such Guests use the Services, as if the Guest and the
                Member were one and the same person and in accordance with these
                Terms and Conditions.
              </p>
              <p className="text-base mb-4 leading-7">
                14.4. Members shall be responsible for bringing these Terms and
                Conditions to the attention of their Guests prior to use of the
                Services, or any one of them, by such Guests. Use of the
                Services, or any one of them, by such Guest shall be an
                acknowledgment by each Guest that they will adhere in full to
                these Terms and Conditions.
              </p>
              <p className="text-base mb-4 leading-7">
                14.5. In addition to the liability of Members for the actions of
                their Guests whilst using the Services, or any one of them,
                Guests shall be personally liable for their actions as though
                they themselves were a Member in accordance with these Terms and
                Conditions.
              </p>
            </div>

            <p className="font-bold text-base mb-4">15. General</p>
            <div className="xl:pl-6">
              <p className="text-base mb-4 leading-7">15.1. Data Protection</p>
              <p className="xl:pl-6 pl-2 mb-4 leading-7">
                15.1.1. The User (which term shall include Members) acknowledges
                and consents that, subject to Supperclubme Now Portal complying
                with all applicable data protection laws in force from time to
                time, Supperclubme Now Portal may disclose to relevant third
                parties (including but not limited to the Service Providers) any
                personal information relating to the User as is reasonably
                necessary in order to, amongst other things, process
                applications for Membership, perform Supperclubme Now Portal
                obligations under these Terms and Conditions and allow the
                Service Providers to provide the Services.
              </p>
              <p className="xl:pl-6 pl-2 mb-4 leading-7">
                15.1.2. The User acknowledges and consents to Supperclubme Now
                Portal using personal information about Users for market
                research purposes and to inform Users about Supperclubme Now
                Portal products and services, legal developments or information
                which Supperclubme Now Portal believes may be of interest to
                Users. For further details please consult our Privacy Policy.
              </p>
              <p className="text-base mb-4 leading-7">15.2. Force Majeure</p>
              <p className="xl:pl-6 pl-2 mb-4 leading-7">
                15.2.1. If by reason of labour dispute, strikes, inability to
                obtain labour or materials, fire or other action of the
                elements, accidents, power or telecommunications failure,
                customs delays, governmental restrictions or appropriation or
                other causes beyond the control of a party, such that
                Supperclubme Now Portal is unable to perform in whole or in part
                its obligations set forth in these terms, then Supperclubme Now
                Portal shall be relieved of those obligations to the extent it
                is unable to perform them and such inability to perform shall
                not make Supperclubme Now Portal liable to any other party.
              </p>
              <p className="text-base mb-4 leading-7">
                15.3. Nature of Agreement
              </p>
              <p className="xl:pl-6 pl-2 mb-4 leading-7">
                15.3.1. For the avoidance of doubt it is hereby expressly agreed
                and declared that:
              </p>
              <p className="xl:pl-8 pl-3 mb-4 leading-7">
                15.3.1.1. nothing in these Terms and Conditions shall create or
                form or be deemed to create or form a partnership or joint
                venture or establish a relationship of employer and employee
                between the Parties; and
              </p>
              <p className="xl:pl-8 pl-3 mb-4 leading-7">
                15.3.1.2. neither Party shall be considered a Commercial Agent
                of the other Party for the purposes of UAE Law No. 18 of 1981,
                as amended (the “Commercial Agencies Law”) and these Terms and
                Conditions shall not be registered as a Commercial Agency in
                accordance with the provisions of the Commercial
              </p>
            </div>
            <p className="font-bold text-base mb-4">
              16. Cancellation & Refund Policy
            </p>
            <div className="xl:pl-6">
              <p className="text-base mb-4 leading-7">
                If you would like your membership cancelled, please let us know.
                However, the membership fee is non refundable.
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
