import { fetchDynamicContent } from "@/lib/utils";
import Link from "next/link";
import { marked } from "marked";

async function PrivacyPolicy() {
  const contents = await fetchDynamicContent("privacy_policy");
  const policy = contents?.data?.data[0] || null;
  marked.use({
    breaks: true
  });
  const html =
    policy?.attributes?.Markdown.length > 0 &&
    marked(policy?.attributes?.Markdown.replaceAll('\n', '&nbsp;\n'), { headerIds: false, mangle: false });
  return (
    <div id="privacy-policy">
      <div className="h-48 5xl:h-52 w-full flex items-center bg-secondary">
        <p
          className="text-primary font-semibold
                pt-20
              
                text-xl lg:text-2xl xl:text-4xl 3xl:text:5xl 5xl:text-5xl

                pl-10 xl:px-20 lg:px-20
                 "
        >
          Privacy Policy
        </p>
      </div>
      {html ? (
        <div className="mt-10 xl:px-20 px-10 mb-10">
          <article dangerouslySetInnerHTML={{ __html: html }}></article>
        </div>
      ) : (
        <div className="mt-10 xl:px-20 px-10 mb-10">
          <p className="text-base leading-7 mb-6">
            This policy explains how{" "}
            <span className="text-primary underline">
              Supperclubme now portal
            </span>{" "}
            , the provider of the website
            <span className="text-primary underline">
              www.supperclubeme.com
            </span>
            collects, stores, uses and shares personal information (including
            but not limited to information from which you can be personally
            identified such as your name, address, email address, or telephone
            number) and information about your visits to the Website, including
            the pages you view, the links you click and other actions taken in
            connection with{" "}
            <span className="text-primary underline">
              [www.supperclubme.com]
            </span>
            <strong>(“Your Data”).</strong>
            It is important that you read and understand this Privacy Policy{" "}
            <strong>(“Policy“).</strong>
          </p>
          <p className="text-base leading-7 mb-6">
            <Link href="" className="text-primary underline">
              {" "}
              Supperclubme now portal
            </Link>{" "}
            may update this Policy at any time. It is your responsibility to
            check for updates to this Policy, as your continued use of the
            Website”
            <Link href="" className="text-primary underline">
              {" "}
              www.supperclubme.com
            </Link>{" "}
            and its Services denotes acceptance of this Policy. Unless stated
            otherwise,<Link href=""> Supperclubme now portal</Link> current
            Policy applies to all information that
            <Link href="" className="text-primary underline">
              {" "}
              Supperclubme now portal{" "}
            </Link>{" "}
            has about you and, if relevant, your Membership.
          </p>
          <p className="text-base leading-7 mb-6">
            Capitalised words in this Policy unless otherwise indicated shall
            have the same meanings as defined in our Terms and Conditions.
          </p>
          <div>
            <p className="text-base leading-7 mb-6 font-bold">
              {" "}
              1. Data Collected
            </p>
            <p className="xl:pl-5 pl-2 leading-7 mb-6">
              <strong>Membership Data: </strong>
              To set up a{" "}
              <Link href="" className="text-primary">
                Supperclubme
              </Link>{" "}
              Membership you are required to complete the registration process.
              This process requires you to provide certain personal information
              such as your name, email address, telephone number, company name
              and job title as well as information about your company such as
              country and industry sector.{" "}
              <Link href="" className="text-primary">
                Supperclubme now portal
              </Link>{" "}
              may also collect user profile information such as age, gender,
              mailing address, and areas which Supperclubme now portal thinks
              may be of special interest to you.
            </p>
            <p className="xl:pl-5 pl-2 leading-7 mb-6">
              <strong>User Communications: </strong>
              When you send email or other communication to
              <Link href="" className="text-primary">
                supperclubme.com
              </Link>{" "}
              or a Service Provider,
              <Link href="" className="text-primary">
                {" "}
                Supperclubme now portal
              </Link>
              may retain those communications in order to process your
              enquiries, respond to your requests and to improve{" "}
              <Link href="" className="text-primary">
                Supperclubme now portal services.
              </Link>
            </p>
            <p className="xl:pl-5 pl-2 leading-7 mb-6">
              <strong>Affiliated Sites: </strong>
              <Link href="" className="text-primary">
                {" "}
                Supperclubme now portal
              </Link>{" "}
              may offer services in connection with other web sites or
              suppliers. Personal information that you provide to those sites
              may be sent to{" "}
              <Link href="" className="text-primary">
                Supperclubme now portal
              </Link>{" "}
              in order to deliver these services.{" "}
              <Link href="" className="text-primary">
                Supperclubme now portal{" "}
              </Link>
              process such information in accordance with this Policy.
            </p>

            <p className="xl:pl-5 pl-2 leading-7 mb-6">
              <strong>Cookies: </strong>
              Our online services may use cookies (small pieces of information
              that are stored by your browser on your computer, tablet or other
              web browsing device’s hard drive) (“Cookies”).
              <Link href="" className="text-primary">
                {" "}
                Supperclubme now portal{" "}
              </Link>
              Cookies do not contain any personally identifying information, but
              they enable{" "}
              <Link href="" className="text-primary">
                {" "}
                Supperclubme now portal
              </Link>{" "}
              to store your delivery details between visits so that you don’t
              have to re-enter information every time you return to a
              Supperclubme now portal site. By using{" "}
              <Link href="" className="text-primary">
                {" "}
                Supperclubme now portal
              </Link>{" "}
              services you consent to the downloading of cookies to your
              computer, tablet or other web browsing device as appropriate.
            </p>
          </div>

          <div>
            <p className="text-base leading-7 mb-6 font-bold">
              {" "}
              2. Use and Sharing of Information
            </p>
            <p className="xl:pl-5 pl-2 leading-7 mb-6">
              <strong> Use of Information:</strong>
              <Link href="" className="text-primary underline">
                {" "}
                Supperclubme now portal{" "}
              </Link>
              collects and uses your personal and activity information, as
              described above, to operate and improve its services or to carry
              out the transactions you request. These uses may include making
              <Link href="" className="text-primary underline">
                {" "}
                Supperclubme now portal{" "}
              </Link>
              services easier to use by eliminating the need for you to enter
              the same information repeatedly, for research and analysis to
              improve
              <Link href="" className="text-primary underline">
                Supperclubme now portal
              </Link>{" "}
              services and technologies, to display customised content and
              advertising, to contact you in connection with your enquiries,
              surveys, your Membership or to deliver promotional material, and
              to provide anonymous reporting to{" "}
              <Link href="" className="text-primary underline">
                www.supperclubme.com
              </Link>{" "}
              Website owners i.e.
              <Link href="" className="text-primary underline">
                {" "}
                Supperclubme now portal
              </Link>
            </p>

            <p className="xl:pl-5 pl-2 leading-7 mb-6">
              <Link href="" className="text-primary underline">
                {" "}
                Supperclubme now portal
              </Link>{" "}
              may store and process personal information collected on{" "}
              <Link href="" className="text-primary underline">
                [www.supperclubme.com]
              </Link>{" "}
              or other{" "}
              <Link href="" className="text-primary underline">
                Supperclubme now portal
              </Link>{" "}
              web sites in the UAE or any other country in which{" "}
              <Link href="" className="text-primary underline">
                Supperclubme now portal
              </Link>
              or its affiliates, subsidiaries or agents maintain facilities, and
              by using a{" "}
              <Link href="" className="text-primary underline">
                Supperclubme now portal
              </Link>{" "}
              service, you consent to any such transfer of your information
              outside your country.
            </p>
            <p className="xl:pl-5 pl-2 leading-7 mb-6">
              <strong> Sharing of Information:</strong>
              Supperclubme now portal will not share or sell personal
              information about you with third parties or non-affiliated
              companies except to provide the products or services you have
              requested, when Supperclubme now portal have your permission, or
              under the following circumstances
            </p>

            <p className="xl:pl-10 pl-4 leading-7 mb-6">
              <strong>1.</strong> When you sign up to a Membership, you must
              accept all the terms and conditions of this Policy and the Terms
              and Conditions before accessing any service provided on, through
              or by the{" "}
              <Link href="" className="text-primary underline">
                www.supperclubme.com/Supperclubme now portal
              </Link>
              (the “Services“). If you do not accept the terms and conditions of
              this Policy, then you cannot be a Member. Access to the Services
              is conditional upon your acceptance of this Policy. Once,
              accepted,
              <Link href="" className="text-primary underline">
                {" "}
                Supperclubme now portal
              </Link>{" "}
              may share your personal information with the Service Providers in
              order to fulfil the offer or service, and you consent to such
              Service Provider contacting you (although they shall not be
              obliged to) as a result of the request of either product or
              service.
            </p>
            <p className="xl:pl-10 pl-4 leading-7 mb-6">
              <strong>2.</strong> Notwithstanding the foregoing,
              <Link href="" className="text-primary underline">
                {" "}
                Supperclubme now portal
              </Link>{" "}
              may provide your personal information to a subsidiary of{" "}
              <Link href="" className="text-primary underline">
                {" "}
                Supperclubme now portal{" "}
              </Link>
              any affiliated companies or other trusted businesses or persons,
              acting under a confidentiality agreement, for the purpose of
              processing personal information on behalf of{" "}
              <Link href="" className="text-primary underline">
                {" "}
                Supperclubme now portal.
              </Link>{" "}
              These parties are required to process such information based on
              instructions from{" "}
              <Link href="" className="text-primary underline">
                Supperclubme now portal
              </Link>
              and in accordance with this Policy. They do not have any
              independent right to share this information.
            </p>

            <p className="xl:pl-10 pl-4 leading-7 mb-6">
              <strong>3.</strong>
              Where Supperclubme now portal believes that it is necessary to
              disclose such information to satisfy any applicable law,
              regulation, legal process or enforceable government request, to
              enforce Supperclubme now portal Terms and Conditions and
              investigate violations thereof, to prevent, detect and address
              fraud, security or technical issues, or to protect against harm to
              the rights and property of Supperclubme now portal and Users as
              required or permitted by law.
            </p>
            <p className="xl:pl-10 pl-4 leading-7 mb-6">
              <strong>4.</strong>
              <Link href="" className="text-primary underline">
                {" "}
                Supperclubme now portal
              </Link>
              may transfer your data if{" "}
              <Link href="" className="text-primary underline">
                Supperclubme now portal
              </Link>
              is acquired by or merged with another company.{" "}
              <Link href="" className="text-primary underline">
                Supperclubme now portal
              </Link>{" "}
              will provide notice before this occurs and will post a new Policy
              if necessary.
            </p>
          </div>

          <div>
            <p className="text-base leading-7 mb-6 font-bold"> 3. Security</p>
            <p className="xl:pl-5 pl-2 leading-7 mb-6">
              To secure your personal information, access to the Members page on
              the Website is password protected, and sensitive information is
              protected by encryption when it is exchanged between your web
              browser and the Supperclubme Website. It is your responsibility to
              keep your password confidential and not to share this information
              with anyone. To protect data stored on{" "}
              <Link href="" className="underline text-primary">
                {" "}
                Supperclubme now portal servers,
              </Link>
              <Link href="" className="underline text-primary">
                {" "}
                Supperclubme now portal{" "}
              </Link>
              regularly audit
              <Link href="" className="underline text-primary">
                {" "}
                Supperclubme now portal{" "}
              </Link>
              system for possible vulnerabilities and attacks. Whilst{" "}
              <Link href="" className="underline text-primary">
                Supperclubme now portal
              </Link>{" "}
              will implement the security measures detailed above, transmission
              of information via the internet is not completely secure and
              therefore transmission via the internet is at your own risk.
            </p>
            <p className="xl:pl-5 pl-2 leading-7 mb-6">
              Any information provided by you in connection with any transaction
              regarding your credit or debit card numbers, expiry date and
              billing or delivery address will be used by{" "}
              <Link href="" className="underline text-primary">
                {" "}
                Supperclubme now portal{" "}
              </Link>
              to process the transaction. These details will be securely stored
              with our online payment processor and may be used by to facilitate
              and personalise future transactions with you.
            </p>
            <p className="xl:pl-5 pl-2 leading-7 mb-6">
              To remove all your details from future promotional communication
              from
              <Link href="" className="underline text-primary">
                {" "}
                Supperclubme now portal{" "}
              </Link>
              please email
              <Link href="" className="underline text-primary">
                {" "}
                [support@supperclubme.com]
              </Link>
              and specify which details you would like removed and from what
              source. You must have the permission to suppress other
              individual’s data, if you are doing so on their behalf.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
export default PrivacyPolicy;
