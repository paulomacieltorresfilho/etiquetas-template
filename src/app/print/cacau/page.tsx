import { convertISOStringToLocaleString } from "@/util/date";
import './etiquetas.css'

function AdesivoContainer(
    {fabricacao, validade}: {fabricacao?: string, validade?: string}
) {
    return (
        <div id="first" className="adesivo-container">
        <div className="adesivo">
          <div className="infos">
            <div className="box info">
              <div className="title">
                <p className="sg">COOKIES</p>
                <p className="sm">Tante Bia</p>
              </div>
              <div className="tel-ing">
                <p style={{marginBottom: '1mm'}} className="ingredientes">
                  Ingredientes: Cacau 100%, açúcar mascavo, açúcar cristal, farinha de trigo,
                  margarina, ovos, bicarbonato de sódio, fermento em pó, essência de baunilha
                  e gotas de chocolate.
                </p>
                <div className="info-num-data">
                    <p style={{fontSize: '10px', alignSelf: 'flex-start'}}>
                      (61) 99359-5826
                    </p>
                    <div style={{textAlign: 'center'}}>
                        <p style={{fontSize: '10px'}}>Desde 2007</p>
                    </div>
                </div>
              </div>
            </div>
            <div className="box tabela-nutricional">
              <p style={{fontSize: '10px'}}>Informação Nutricional</p>
              <table>
                <tr>
                  <td>Porção</td>
                  <td>35g</td>
                  <td>*VD</td>
                </tr>
                <tr>
                  <td>Valor energético</td>
                  <td style={{fontSize: '7px'}}>100kcal e 462kj</td>
                  <td>5,5%</td>
                </tr>
                <tr>
                  <td>Carboidratos</td>
                  <td>18g</td>
                  <td>6%</td>
                </tr>
                <tr>
                  <td>Proteínas</td>
                  <td>1,5g</td>
                  <td>2%</td>
                </tr>
                <tr>
                  <td>Gorduras totais</td>
                  <td>3,5g</td>
                  <td>6,4%</td>
                </tr>
                <tr>
                  <td>Gorduras saturadas</td>
                  <td>0,8g</td>
                  <td>3,5%</td>
                </tr>
                <tr>
                  <td>Gorduras trans</td>
                  <td>0g</td>
                  <td>0%</td>
                </tr>
                <tr>
                  <td>Fibra alimentar</td>
                  <td>0,5g</td>
                  <td>2%</td>
                </tr>
                <tr>
                  <td>Sódio</td>
                  <td>265mg</td>
                  <td>11%</td>
                </tr>
                <tr>
                  <td>Ferro</td>
                  <td>0,25g</td>
                  <td>4,5%</td>
                </tr>
                <tr>
                  <td>Fósforo</td>
                  <td>17,4g</td>
                  <td>2,5%</td>
                </tr>
              </table>
              <p
                style={{
                  fontSize: '6px',
                  textAlign: 'justify',
                  paddingLeft: '1.25mm',
                  paddingRight: '1.25mm',
                }}
              >
                % Valores Diários com base em uma dieta de 2.000 kcal ou 8400
                kJ. Seus valores diários podem ser maiores ou menores dependendo
                de suas necessidades energéticas.
              </p>
            </div>
          </div>
          <div style={{alignSelf: 'flex-end'}} className="validade">
            <p style={{marginLeft: '5mm'}}>F: {fabricacao}</p>
            <p style={{marginRight: validade ? '1.5cm' : '3.7cm'}}>V: {validade}</p>
          </div>
        </div>
      </div>
    )
}

export default function BaunilhaPage(params: {
    searchParams: { validade?: string; fabricacao?: string };
  }) {
  
    let fabricacao;
    let validade;

    if (params.searchParams.validade && params.searchParams.fabricacao) {
      fabricacao = convertISOStringToLocaleString(params.searchParams.fabricacao)
      validade = convertISOStringToLocaleString(params.searchParams.validade)
    }
  
    return (
      <div className="container">
          <AdesivoContainer validade={validade} fabricacao={fabricacao} />
          <AdesivoContainer validade={validade} fabricacao={fabricacao} />
          <AdesivoContainer validade={validade} fabricacao={fabricacao} />
          <AdesivoContainer validade={validade} fabricacao={fabricacao} />
          <AdesivoContainer validade={validade} fabricacao={fabricacao} />
          <AdesivoContainer validade={validade} fabricacao={fabricacao} />
          <AdesivoContainer validade={validade} fabricacao={fabricacao} />
          <AdesivoContainer validade={validade} fabricacao={fabricacao} />
          <AdesivoContainer validade={validade} fabricacao={fabricacao} />
          <AdesivoContainer validade={validade} fabricacao={fabricacao} />
      </div>
    );
  }
  