import React from 'react';

export default function Test() {
  return <div>
		<h1>{window.location.href.replace("https://i8b204.p.ssafy.io/kakaopay/success?pg_token=", "")}</h1>
	</div>;
}
