import { ImageResponse } from 'next/og';

export const alt = 'OBELISK-Z';
export const size = {
  width: 1200,
  height: 630
};
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background:
            'radial-gradient(circle at 50% 35%, rgba(184,79,255,0.25), rgba(6,2,15,1) 62%)',
          color: '#f5eeff'
        }}
      >
        <div
          style={{
            fontSize: 80,
            letterSpacing: 5,
            fontWeight: 800
          }}
        >
          OBELISK-Z
        </div>
        <div
          style={{
            marginTop: 18,
            fontSize: 34,
            letterSpacing: 2,
            color: '#d580ff'
          }}
        >
          Ecossistema ZETTA
        </div>
        <div
          style={{
            marginTop: 36,
            fontSize: 24,
            color: 'rgba(215,190,255,.92)',
            maxWidth: 920,
            textAlign: 'center'
          }}
        >
          Infraestrutura institucional para wallet soberana, segura e multichain.
        </div>
      </div>
    ),
    size
  );
}
