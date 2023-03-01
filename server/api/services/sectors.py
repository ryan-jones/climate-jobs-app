def format_sector(sector):
    sector_name = sector.lower()

    if sector_name in ['capital', 'energy', 'transportation', 'built environment', 'carbon technology', 'research & education']:
        return sector_name

    if sector_name in ['advocacy or policy', 'supporting catalysts']:
        return 'advocacy'

    if sector_name in ['buildings']:
        return 'built environment'

    if sector_name in ['carbon removal tech']:
        return 'carbon technology'

    if sector_name in ['climate adaptation', 'intelligence and adaptation']:
        return 'adaptation'

    if sector_name in ['food, agriculture, & land use', 'food and agriculture']:
        return 'food & agriculture'

    if sector_name in ['materials & manufacturing', 'industry and manufacturing']:
        return 'industry'

    if sector_name in ['transportation and mobility']:
        return 'transportation'

    if sector_name in ['energy and grid']:
        return 'energy'

    if sector_name in ['media & journalism']:
        return 'media'

    if sector_name in ['coastal & ocean sinks']:
        return 'environmental solutions'

    return sector_name
