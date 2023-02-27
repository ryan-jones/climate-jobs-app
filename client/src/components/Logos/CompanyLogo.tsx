import { Img } from '@chakra-ui/react';
import { JobSource } from '../../types/jobSource';
import ClimateBaseLogo from './ClimateBaseLogo';
import climatePeopleLogo from '../../assets/climate_people.png';

interface CompanyLogoProps {
  source: string;
}
const CompanyLogo = ({ source }: CompanyLogoProps) => {
  if (source === JobSource.ClimateBase) {
    return <ClimateBaseLogo height="30" />;
  }

  return <Img src={climatePeopleLogo} height="30" />;
};

export default CompanyLogo;
