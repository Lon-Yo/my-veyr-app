import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import {
  FaSearch,
  FaComment,
  FaPlus,
  FaThumbtack,
  FaEdit,
  FaTrash,
  FaCheckCircle,
  FaTimesCircle,
  FaQuestionCircle,
  FaSave,
  FaFileCsv,
  FaArrowUp,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaChevronUp,
  FaLink,
  FaExternalLinkAlt,
  FaThumbsUp,
  FaThumbsDown
} from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MessageList, Input } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';

function App() {
  const getInitialBots = () => {
    return [
        {
          id: 1,
          name: 'Customer Support Bot',
          tags: ['support', 'inquiries', 'helpdesk', 'customers'],
          links: [
            { url: 'https://www.microsoft.com/en-us/microsoft-365/sharepoint/collaboration', version: '1.2', lastUpdated: '2023-07-20', status: 'success' },
            { url: 'https://www.sharepoint.com/example102', version: '2.0', lastUpdated: '2023-07-25', status: 'pending' },
          ],
          systemPrompt: 'You are a helpful customer support assistant. You have been trained on the following documents: [links]. Please answer questions based on the information in these documents.',
        },
        {
          id: 2,
          name: 'Sales Inquiry Bot',
          tags: ['sales', 'pricing', 'products', 'quotes', 'orders'],
          links: [
            { url: 'https://www.sharepoint.com/example201', version: '3.1', lastUpdated: '2023-07-15', status: 'success' },
            { url: 'https://www.sharepoint.com/example202', version: '1.8', lastUpdated: '2023-07-28', status: 'success' },
          ],
          systemPrompt: 'You are a sales assistant providing information about our products and pricing. You are familiar with the following documents: [links]. Please provide accurate quotes and answer sales-related questions.',
        },
        {
          id: 3,
          name: 'HR Policy Bot',
          tags: ['hr', 'policy', 'benefits', 'onboarding', 'employees', 'handbook'],
          links: [
            { url: 'https://www.sharepoint.com/example301', version: '4.0', lastUpdated: '2023-07-10', status: 'success' },
            { url: 'https://www.sharepoint.com/example302', version: '1.5', lastUpdated: '2023-07-22', status: 'failed' },
            { url: 'https://www.sharepoint.com/example303', version: '2.2', lastUpdated: '2023-07-29', status: 'success' },
          ],
          systemPrompt: 'You are an HR assistant providing information about company policies, benefits, and onboarding procedures. You have access to the following documents: [links]. Please answer questions based on these resources.',
        },
        {
          id: 4,
          name: 'Technical Support Bot',
          tags: ['technical', 'support', 'troubleshooting', 'issues', 'helpdesk', 'technical documents'],
          links: [
            { url: 'https://www.sharepoint.com/example401', version: '1.0', lastUpdated: '2023-07-18', status: 'success' },
            { url: 'https://www.sharepoint.com/example402', version: '1.2', lastUpdated: '2023-07-25', status: 'success' },
          ],
          systemPrompt: 'You are a technical support assistant. You are knowledgeable about our products and have access to technical documents. Please assist users with troubleshooting and resolving technical issues.',
        },
        {
          id: 5,
          name: 'Marketing Bot',
          tags: ['marketing', 'promotions', 'campaigns', 'social media', 'advertising'],
          links: [
            { url: 'https://www.sharepoint.com/example501', version: '2.5', lastUpdated: '2023-07-26', status: 'pending' },
            { url: 'https://www.sharepoint.com/example502', version: '1.1', lastUpdated: '2023-07-21', status: 'success' },
          ],
          systemPrompt: 'You are a marketing assistant. You are familiar with our marketing campaigns, promotions, and social media guidelines. Please provide information about our marketing efforts.',
        },
        {
          id: 6,
          name: 'Financial Bot',
          tags: ['finance', 'accounting', 'budget', 'reports', 'expenses'],
          links: [
            { url: 'https://www.sharepoint.com/example601', version: '4.2', lastUpdated: '2023-07-29', status: 'success' },
            { url: 'https://www.sharepoint.com/example602', version: '1.3', lastUpdated: '2023-07-27', status: 'success' },
          ],
          systemPrompt: 'You are a financial assistant. You have access to financial reports and budget guidelines. Please assist with questions related to finance and accounting.',
        },
        {
          id: 7,
          name: 'Legal Bot',
          tags: ['legal', 'compliance', 'contracts', 'agreements', 'regulations'],
          links: [
            { url: 'https://www.sharepoint.com/example701', version: '3.0', lastUpdated: '2023-07-23', status: 'success' },
            { url: 'https://www.sharepoint.com/example702', version: '1.9', lastUpdated: '2023-07-28', status: 'failed' },
          ],
          systemPrompt: 'You are a legal assistant. You are knowledgeable about legal documents, compliance, and regulations. Please provide information based on legal resources.',
        },
        {
          id: 8,
          name: 'Operations Bot',
          tags: ['operations', 'logistics', 'supply chain', 'inventory', 'processes'],
          links: [
            { url: 'https://www.sharepoint.com/example801', version: '2.1', lastUpdated: '2023-07-20', status: 'success' },
            { url: 'https://www.sharepoint.com/example802', version: '1.6', lastUpdated: '2023-07-26', status: 'success' },
          ],
          systemPrompt: 'You are an operations assistant. You are familiar with our operations manual and inventory reports. Please assist with questions related to logistics and supply chain processes.',
        },
        {
          id: 9,
          name: 'Product Development Bot',
          tags: ['product', 'development', 'innovation', 'design', 'features', 'roadmap'],
          links: [
            { url: 'https://www.sharepoint.com/example901', version: '5.0', lastUpdated: '2023-07-25', status: 'success' },
            { url: 'https://www.sharepoint.com/example902', version: '2.4', lastUpdated: '2023-07-29', status: 'success' },
          ],
          systemPrompt: 'You are a product development assistant. You have access to the product roadmap and design specifications. Please provide information about product features and development plans.',
        },
        {
          id: 10,
          name: 'IT Support Bot',
          tags: ['it', 'support', 'network', 'security', 'systems', 'infrastructure', 'helpdesk'],
          links: [
            { url: 'https://www.sharepoint.com/example1001', version: '1.7', lastUpdated: '2023-07-22', status: 'success' },
            { url: 'https://www.sharepoint.com/example1002', version: '1.1', lastUpdated: '2023-07-27', status: 'success' },
          ],
          systemPrompt: 'You are an IT support assistant. You are knowledgeable about IT security policies and network infrastructure. Please assist with questions related to IT systems and security.',
        },
        {
          id: 11,
          name: 'Quality Assurance Bot',
          tags: ['qa', 'testing', 'quality', 'standards'],
          links: [
            { url: 'https://www.sharepoint.com/example1101', version: '2.0', lastUpdated: '2023-07-24', status: 'success' },
            { url: 'https://www.sharepoint.com/example1102', version: '1.3', lastUpdated: '2023-07-28', status: 'success' },
          ],
          systemPrompt: 'You are a QA assistant. Help with testing procedures and quality standards.',
        },
        {
          id: 12,
          name: 'Project Management Bot',
          tags: ['project', 'management', 'planning', 'agile', 'scrum'],
          links: [
            { url: 'https://www.sharepoint.com/example1201', version: '3.0', lastUpdated: '2023-07-25', status: 'success' },
          ],
          systemPrompt: 'You are a project management assistant. Help with project planning and agile methodologies.',
        },
        {
          id: 13,
          name: 'Data Analytics Bot',
          tags: ['data', 'analytics', 'reporting', 'metrics'],
          links: [
            { url: 'https://www.sharepoint.com/example1301', version: '1.5', lastUpdated: '2023-07-26', status: 'success' },
          ],
          systemPrompt: 'You are a data analytics assistant. Help with data interpretation and reporting.',
        },
        {
          id: 14,
          name: 'Compliance Bot',
          tags: ['compliance', 'regulations', 'audit', 'standards'],
          links: [
            { url: 'https://www.sharepoint.com/example1401', version: '2.1', lastUpdated: '2023-07-27', status: 'success' },
          ],
          systemPrompt: 'You are a compliance assistant. Help with regulatory requirements and audits.',
        },
        {
          id: 15,
          name: 'Training Bot',
          tags: ['training', 'learning', 'development', 'education'],
          links: [
            { url: 'https://www.sharepoint.com/example1501', version: '1.8', lastUpdated: '2023-07-28', status: 'success' },
          ],
          systemPrompt: 'You are a training assistant. Help with learning and development programs.',
        },
        {
          id: 16,
          name: 'Facilities Bot',
          tags: ['facilities', 'maintenance', 'building', 'equipment'],
          links: [
            { url: 'https://www.sharepoint.com/example1601', version: '1.2', lastUpdated: '2023-07-29', status: 'success' },
          ],
          systemPrompt: 'You are a facilities assistant. Help with building maintenance and equipment.',
        },
        {
          id: 17,
          name: 'Research Bot',
          tags: ['research', 'development', 'innovation', 'studies'],
          links: [
            { url: 'https://www.sharepoint.com/example1701', version: '2.4', lastUpdated: '2023-07-30', status: 'success' },
          ],
          systemPrompt: 'You are a research assistant. Help with research and development projects.',
        },
        {
          id: 18,
          name: 'Security Bot',
          tags: ['security', 'safety', 'protection', 'protocols'],
          links: [
            { url: 'https://www.sharepoint.com/example1801', version: '3.2', lastUpdated: '2023-07-31', status: 'success' },
          ],
          systemPrompt: 'You are a security assistant. Help with safety and security procedures.',
        },
        {
          id: 19,
          name: 'Supply Chain Bot',
          tags: ['supply', 'chain', 'logistics', 'inventory'],
          links: [
            { url: 'https://www.sharepoint.com/example1901', version: '1.6', lastUpdated: '2023-08-01', status: 'success' },
          ],
          systemPrompt: 'You are a supply chain assistant. Help with logistics and inventory management.',
        },
        {
          id: 20,
          name: 'Risk Management Bot',
          tags: ['risk', 'management', 'assessment', 'mitigation'],
          links: [
            { url: 'https://www.sharepoint.com/example2001', version: '2.3', lastUpdated: '2023-08-02', status: 'success' },
          ],
          systemPrompt: 'You are a risk management assistant. Help with risk assessment and mitigation strategies.',
        },
        {
          id: 21,
          name: 'Change Management Bot',
          tags: ['change', 'management', 'transition', 'transformation'],
          links: [
            { url: 'https://www.sharepoint.com/example2101', version: '1.4', lastUpdated: '2023-08-03', status: 'success' },
          ],
          systemPrompt: 'You are a change management assistant. Help with organizational transitions.',
        },
        {
          id: 22,
          name: 'Innovation Bot',
          tags: ['innovation', 'ideas', 'creativity', 'development'],
          links: [
            { url: 'https://www.sharepoint.com/example2201', version: '1.9', lastUpdated: '2023-08-04', status: 'success' },
          ],
          systemPrompt: 'You are an innovation assistant. Help with creative problem-solving and new ideas.',
        },
        {
          id: 23,
          name: 'Documentation Bot',
          tags: ['documentation', 'writing', 'procedures', 'manuals'],
          links: [
            { url: 'https://www.sharepoint.com/example2301', version: '2.2', lastUpdated: '2023-08-05', status: 'success' },
          ],
          systemPrompt: 'You are a documentation assistant. Help with writing and maintaining documentation.',
        },
        {
          id: 24,
          name: 'Process Improvement Bot',
          tags: ['process', 'improvement', 'optimization', 'efficiency'],
          links: [
            { url: 'https://www.sharepoint.com/example2401', version: '1.7', lastUpdated: '2023-08-06', status: 'success' },
          ],
          systemPrompt: 'You are a process improvement assistant. Help with optimizing workflows and procedures.',
        },
        {
          id: 25,
          name: 'Sustainability Bot',
          tags: ['sustainability', 'environmental', 'green', 'eco-friendly'],
          links: [
            { url: 'https://www.sharepoint.com/example2501', version: '1.1', lastUpdated: '2023-08-07', status: 'success' },
          ],
          systemPrompt: 'You are a sustainability assistant. Help with environmental initiatives and green practices.',
        }
      ];
  };

  const calculateBotsPerPage = () => {
    // Check if we're on mobile
    if (window.innerWidth <= 768) {
      return 10; // Show 10 cards per page on mobile
    } else {
      // Desktop layout calculation
      const container = document.querySelector('.bot-list');
      if (!container) return 9;
      
      const containerWidth = container.clientWidth;
      const cardMinWidth = 350;
      const columns = Math.floor(containerWidth / cardMinWidth);
      return columns * 3;
    }
  };

  const [botsPerPage, setBotsPerPage] = useState(9); // Start with default 9

  // Add resize listener to update botsPerPage
  useEffect(() => {
    const handleResize = () => {
      setBotsPerPage(calculateBotsPerPage());
    };

    // Initial calculation
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const chatInputRef = useRef(null);
  const searchInputRef = useRef(null);
  const chatHistoryRef = useRef(null);
  const messageListRef = useRef(null);
  const savedSearchesRef = useRef(null);

  const [mode, setMode] = useState('chat');
  const [searchText, setSearchText] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [filteredBots, setFilteredBots] = useState([]);
  const [pinnedBots, setPinnedBots] = useState([]);
  const [allBots, setAllBots] = useState([]);
  const [showStats, setShowStats] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [savedSearches, setSavedSearches] = useState([]);
  const [showPinnedOnly, setShowPinnedOnly] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [tagSuggestions, setTagSuggestions] = useState([]);
  const [newTagText, setNewTagText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showMenu, setShowMenu] = useState(false);
  const [expandedBots, setExpandedBots] = useState(() => {
    // Initialize all bots as expanded
    const initialBots = getInitialBots();
    return initialBots.reduce((acc, bot) => {
      acc[bot.id] = false;
      return acc;
    }, {});
  });

  const [contextMenu, setContextMenu] = useState({ 
    show: false, 
    x: 0, 
    y: 0, 
    type: null, 
    itemId: null, 
    index: null 
  });

  const controlsRef = useRef(null);

  // Add this near your other useRef declarations
  const expandedBotsRef = useRef({});

  // Update your expandedBots state setter to also update the ref
  const setExpandedBotsWithRef = (newValue) => {
    const value = typeof newValue === 'function' ? newValue(expandedBots) : newValue;
    expandedBotsRef.current = value;
    setExpandedBots(value);
  };

  useEffect(() => {
    const initialBots = getInitialBots();
    setAllBots(initialBots);
    setFilteredBots(initialBots);
    setSavedSearches(getInitialSavedSearches());
    setSearchSuggestions([]);
    setExpandedBots(initialBots.reduce((acc, bot) => {
      acc[bot.id] = false;
      return acc;
    }, {}));
    setTimeout(() => handleSearch(), 0);
  }, []);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.style.height = '24px';
      const scrollHeight = searchInputRef.current.scrollHeight;
      const maxHeight = 48;
      searchInputRef.current.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
    }
    if (searchText.trim()) {
      handleSearch();
    }
  }, [searchText]);

  useEffect(() => {
    // When switching to search mode
    if (mode === 'search') {
      setChatHistory([]);
      // Clear search suggestions when returning to search
      setSearchSuggestions([]);
      // Show search results if there's a search term, otherwise show all bots
      if (searchText.trim()) {
        handleSearch();
      } else {
        setFilteredBots(allBots);
      }
      // Reset showPinnedOnly when switching to search mode
      setShowPinnedOnly(false);
    } else {
      // In chat mode, only show pinned bots
      setFilteredBots(pinnedBots);
    }
    // Reset current page when changing modes
    setCurrentPage(1);
  }, [mode, allBots]);

  useEffect(() => {
    if (showPinnedOnly) {
      setFilteredBots(pinnedBots);
    } else {
      // When showing all, either show search results or all bots
      if (searchText.trim()) {
        handleSearch();
      } else {
        setFilteredBots(allBots);
      }
    }
    setCurrentPage(1);
  }, [showPinnedOnly, searchText]);

  // Update filtered bots when pins change
  useEffect(() => {
    if (mode === 'chat' || showPinnedOnly) {
      setFilteredBots(pinnedBots);
      if (showPinnedOnly && pinnedBots.length <= (currentPage - 1) * botsPerPage) {
        setCurrentPage(1);
      }
    }
  }, [pinnedBots, mode, showPinnedOnly]);

  const getInitialSavedSearches = () => {
    return [
        { name: 'Support Chat', searchText: 'support OR helpdesk', pinnedBots: [1] },
        { name: 'Sales and Pricing', searchText: 'sales AND pricing', pinnedBots: [2] },
        { name: 'HR Policies', searchText: 'hr OR policy', pinnedBots: [3] },
        { name: 'Technical Issues', searchText: 'technical AND support', pinnedBots: [4] },
        { name: 'Marketing Campaigns', searchText: 'marketing OR social media', pinnedBots: [5] },
        { name: 'Financial Reports', searchText: 'finance AND reports', pinnedBots: [6] },
      ];
  };

  const getInitialSearchSuggestions = () => {
    return [
        'support', 'sales', 'hr', 'pricing', 'helpdesk', 'technical', 'marketing', 'finance', 'legal', 'operations', 'product', 'it', 'customers', 'quotes', 'orders', 'employees', 'handbook', 'technical documents', 'promotions', 'campaigns', 'social media', 'advertising', 'accounting', 'budget', 'reports', 'expenses', 'compliance', 'contracts', 'agreements', 'regulations', 'logistics', 'supply chain', 'inventory', 'processes', 'innovation', 'design', 'features', 'roadmap', 'network', 'security', 'systems', 'infrastructure'
      ];
  };

  // Add new state for sort mode
  const [sortMode, setSortMode] = useState('alpha'); // 'alpha' or 'rank'

  // Add sort function
  const sortBots = (bots) => {
    return [...bots].sort((a, b) => {
      if (sortMode === 'alpha') {
        return a.name.localeCompare(b.name);
      } else {
        const metricsA = botMetrics[a.id];
        const metricsB = botMetrics[b.id];
        return metricsB.queries - metricsA.queries; // Higher queries first
      }
    });
  };

  // Update the sort toggle button click handler
  const handleSortToggle = () => {
    setSortMode(prev => prev === 'alpha' ? 'rank' : 'alpha');
    // Immediately resort the current filtered bots
    setFilteredBots(prev => sortBots(prev));
    // Reset to first page
    setCurrentPage(1);
  };

  // Update the useEffect for filtering to include sorting
  useEffect(() => {
    if (mode === 'chat' || showPinnedOnly) {
      setFilteredBots(sortBots(pinnedBots));
    } else if (searchText.trim()) {
      handleSearch();
    } else {
      setFilteredBots(sortBots(allBots));
    }
  }, [sortMode]); // Add sortMode as dependency

  // Update handleSearch to include sorting
  const handleSearch = () => {
    if (mode === 'chat') return;

    if (searchText.trim()) {
      // Split the search text into OR groups
      const orGroups = searchText.split(/\s+OR\s+/);
      
      let filtered = allBots.filter(bot => {
        // For each bot, check if it matches any of the OR groups
        return orGroups.some(group => {
          // Remove parentheses and split into individual terms
          const terms = group.replace(/[()]/g, '').trim().split(/\s+/);
          
          // Get all searchable text from the bot
          const botText = [
            bot.name.toLowerCase(),
            ...bot.tags.map(tag => tag.toLowerCase())
          ].join(' ');

          // Match if ALL terms in the group match the bot text (AND condition)
          return terms.every(term => 
            botText.includes(term.toLowerCase())
          );
        });
      });

      if (showPinnedOnly) {
        filtered = filtered.filter(bot => 
          pinnedBots.some(pinnedBot => pinnedBot.id === bot.id)
        );
      }

      // Apply sorting before setting filtered bots
      setFilteredBots(sortBots(filtered));
      if (filtered.length <= (currentPage - 1) * botsPerPage) {
        setCurrentPage(1);
      }
    } else {
      // Apply sorting to all bots or pinned bots
      setFilteredBots(sortBots(showPinnedOnly ? pinnedBots : allBots));
    }
  };
  

    const handleChatSubmit = () => {
      if (!searchText.trim() || (!isOrchestratorMode && pinnedBots.length === 0)) return;

      const userMessage = {
        text: searchText,
        sender: 'user'
      };

      const botResponse = {
        text: isOrchestratorMode 
          ? "The orchestrator is analyzing your message..."
          : `Response from ${pinnedBots.map(bot => bot.name).join(', ')}...`,
        sender: 'bot'
      };

      setChatHistory(prev => [...prev, userMessage, botResponse]);
      setSearchText('');

      // Focus the input after submission
      setTimeout(() => {
        const inputElement = document.querySelector('.rce-input-textarea');
        if (inputElement) {
          inputElement.focus();
        }
      }, 0);
    };

    const handleNewChat = () => {
        setChatHistory([]);
        setSearchText('');
        setPinnedBots([]);
        setMode('search');
      };
    

  const togglePin = (botId) => {
    const bot = allBots.find((b) => b.id === botId);
    if (!bot) return;
    
    setPinnedBots(prevPinnedBots => {
      if (prevPinnedBots.find((b) => b.id === botId)) {
        return prevPinnedBots.filter((b) => b.id !== botId);
      } else {
        return [...prevPinnedBots, bot];
      }
    });
  };

  const handleEdit = (botId, field, index = -1) => {
    const updatedBots = [...allBots];
    const botIndex = updatedBots.findIndex((bot) => bot.id === botId);

    if (botIndex === -1) return;

    let newValue = '';
    if (field === 'name') {
      newValue = prompt('Enter new name:', updatedBots[botIndex].name);
    } else if (field === 'tags') {
      newValue = prompt('Enter new tag:', index >= 0 ? updatedBots[botIndex].tags[index] : '');
    } else if (field === 'links') {
      newValue = prompt('Enter new link URL:', index >= 0 ? updatedBots[botIndex].links[index].url : '');
    } else if (field === 'systemPrompt') {
      newValue = prompt('Enter new system prompt:', updatedBots[botIndex].systemPrompt);
    }

    if (newValue === null || newValue.trim() === '') return;

    if (field === 'name') {
      updatedBots[botIndex].name = newValue;
    } else if (field === 'tags' && index >= 0) {
      updatedBots[botIndex].tags[index] = newValue;
    } else if (field === 'links' && index >= 0) {
      updatedBots[botIndex].links[index].url = newValue;
    } else if (field === 'systemPrompt') {
      updatedBots[botIndex].systemPrompt = newValue;
    }

    setAllBots(updatedBots);
  };

  const handleDelete = (botId, field, index = -1) => {
    const updatedBots = allBots.map((bot) => {
      if (bot.id === botId) {
        if (field === 'tags' && index >= 0) {
          return { ...bot, tags: bot.tags.filter((_, i) => i !== index) };
        } else if (field === 'links' && index >= 0) {
          return { ...bot, links: bot.links.filter((_, i) => i !== index) };
        } else if (field === 'bot') {
          if (window.confirm(`Are you sure you want to delete the bot "${bot.name}"?`)) {
            return null;
          }
          return bot;
        }
      }
      return bot;
    }).filter((bot) => bot !== null);
  
    setAllBots(updatedBots);
    setFilteredBots(prevFiltered => 
      prevFiltered.map(bot => {
        if (bot.id === botId) {
          if (field === 'tags' && index >= 0) {
            return { ...bot, tags: bot.tags.filter((_, i) => i !== index) };
          } else if (field === 'links' && index >= 0) {
            return { ...bot, links: bot.links.filter((_, i) => i !== index) };
          } else if (field === 'bot') {
            return null;
          }
        }
        return bot;
      }).filter(bot => bot !== null)
    );
    if (field === 'bot') {
      setPinnedBots(pinnedBots.filter((bot) => bot.id !== botId));
    }
  };
  
  const getLinkStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <FaCheckCircle className="status-icon success" />;
      case 'pending':
        return <FaCheckCircle className="status-icon pending" />;
      case 'failed':
        return <FaTimesCircle className="status-icon failed" />;
      default:
        return null;
    }
  };

  const getAllUniqueTags = () => {
    return [...new Set(allBots.flatMap(bot => bot.tags))];
  };

  const addTag = (botId) => {
    setNewTagText('');
    setTagSuggestions([]);
    
    // Create and show the tag input dialog
    const dialog = document.createElement('div');
    dialog.className = 'tag-input-dialog';
    dialog.innerHTML = `
      <div class="tag-input-content">
        <h4>Add New Tag</h4>
        <input type="text" id="new-tag-input" placeholder="Enter tag name..." />
        <div class="tag-suggestions"></div>
        <div class="dialog-buttons">
          <button class="cancel-button">Cancel</button>
          <button class="add-button">Add</button>
        </div>
      </div>
    `;
    document.body.appendChild(dialog);

    const input = dialog.querySelector('#new-tag-input');
    const suggestionsDiv = dialog.querySelector('.tag-suggestions');
    
    input.focus();

    input.addEventListener('input', (e) => {
      const value = e.target.value.toLowerCase();
      if (value) {
        const suggestions = getAllUniqueTags().filter(tag => 
          tag.toLowerCase().includes(value)
        );
        suggestionsDiv.innerHTML = suggestions
          .map(tag => `<div class="tag-suggestion">${tag}</div>`)
          .join('');
      } else {
        suggestionsDiv.innerHTML = '';
      }
    });

    suggestionsDiv.addEventListener('click', (e) => {
      if (e.target.classList.contains('tag-suggestion')) {
        input.value = e.target.textContent;
        suggestionsDiv.innerHTML = '';
      }
    });

    const handleAdd = () => {
      const newTag = input.value.trim();
      // Check if the bot already has this tag (case-insensitive)
      const bot = allBots.find(b => b.id === botId);
      const tagExists = bot.tags.some(tag => 
        tag.toLowerCase() === newTag.toLowerCase()
      );
      
      if (!newTag) {
        alert('Please enter a tag name.');
        return;
      }
      
      if (tagExists) {
        alert('This tag already exists on this bot.');
        return;
      }
      
      if (newTag) {
        const updatedBots = allBots.map((bot) =>
          bot.id === botId ? { ...bot, tags: [...bot.tags, newTag] } : bot
        );
        setAllBots(updatedBots);
        setFilteredBots(prevFiltered => 
          prevFiltered.map(bot => 
            bot.id === botId ? { ...bot, tags: [...bot.tags, newTag] } : bot
          )
        );
      }
      document.body.removeChild(dialog);
    };

    dialog.querySelector('.add-button').addEventListener('click', handleAdd);
    dialog.querySelector('.cancel-button').addEventListener('click', () => {
      document.body.removeChild(dialog);
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        handleAdd();
      } else if (e.key === 'Escape') {
        document.body.removeChild(dialog);
      }
    });
  };

  const addLink = (botId) => {
    const newLinkUrl = prompt('Enter new link URL:');
    if (newLinkUrl) {
      const newLink = {
        url: newLinkUrl,
        version: '1.0',
        lastUpdated: new Date().toLocaleDateString(),
        status: 'pending',
      };
      const updatedBots = allBots.map((bot) =>
        bot.id === botId ? { ...bot, links: [...bot.links, newLink] } : bot
      );
      setAllBots(updatedBots);
      setFilteredBots(prevFiltered => 
        prevFiltered.map(bot => 
          bot.id === botId ? { ...bot, links: [...bot.links, newLink] } : bot
        )
      );
    }
  };

  const addBot = () => {
    const dialog = document.createElement('div');
    dialog.className = 'feedback-dialog-overlay';
    dialog.innerHTML = `
      <div class="feedback-dialog">
        <h3>Add New Bot</h3>
        <input 
          type="text" 
          id="new-bot-input" 
          placeholder="Enter bot name..."
          class="feedback-dialog-input"
          style="width: calc(100% - 24px); padding: 12px; border: 1px solid #ccc; border-radius: 4px; margin-bottom: 15px; font-family: inherit; font-size: 14px;"
        />
        <div class="feedback-dialog-buttons">
          <button class="cancel-button">Cancel</button>
          <button class="add-button">Add Bot</button>
        </div>
      </div>
    `;
    document.body.appendChild(dialog);

    const input = dialog.querySelector('#new-bot-input');
    input.focus();

    const handleAdd = () => {
      const newBotName = input.value.trim();
      if (newBotName) {
        const newBot = {
          id: allBots.length + 1,
          name: newBotName,
          tags: [],
          links: [],
          systemPrompt: '',
        };
        const updatedBots = [newBot, ...allBots];
        setAllBots(updatedBots);
        if (!showPinnedOnly) {
          setFilteredBots(prev => [newBot, ...prev]);
        }
        setCurrentPage(1);
      }
      document.body.removeChild(dialog);
    };

    dialog.querySelector('.add-button').addEventListener('click', handleAdd);
    dialog.querySelector('.cancel-button').addEventListener('click', () => {
      document.body.removeChild(dialog);
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleAdd();
      if (e.key === 'Escape') document.body.removeChild(dialog);
    });
  };

  const saveCurrentSearch = () => {
    const name = prompt('Enter a name for this search:');
    if (name) {
      setSavedSearches([
        ...savedSearches,
        { name, searchText, pinnedBots: pinnedBots.map((bot) => bot.id) },
      ]);
    }
  };

  const handleLoadSearch = (search) => {
    setSearchText(search.searchText);
    setPinnedBots(allBots.filter((bot) => search.pinnedBots.includes(bot.id)));
    handleSearch();
    setMode('search');
    setOpenSection(null);
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const botId = parseInt(event.target.dataset.botId);
    if (!botId || !allBots.some((bot) => bot.id === botId)) {
      alert('Invalid bot ID.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      let links = [];

      if (file.type === 'text/csv') {
        links = content.split(/\r?\n/).map((line) => line.split(',')[0].trim());
      } else {
        links = content.split(/\r?\n/).map((line) => line.trim());
      }

      links = links.filter((link) => link);

      if (links.length > 0) {
        const updatedBots = allBots.map((bot) => {
          if (bot.id === botId) {
            const newLinks = links.map((url) => ({
              url,
              version: '1.0',
              lastUpdated: new Date().toLocaleDateString(),
              status: 'pending',
            }));
            return { ...bot, links: [...bot.links, ...newLinks] };
          }
          return bot;
        });
        setAllBots(updatedBots);
        setFilteredBots(prevFiltered => 
          prevFiltered.map(bot => 
            bot.id === botId ? updatedBots.find(b => b.id === botId) : bot
          )
        );
      }
    };

    reader.onerror = () => {
      alert('Error reading file.');
    };

    reader.readAsText(file);
    event.target.value = ''; // Reset the file input
  };

  const stats = {
    numBots: pinnedBots.length,
    numFiles: pinnedBots.length > 0 
      ? pinnedBots.reduce((total, bot) => total + bot.links.length, 0)
      : filteredBots.reduce((total, bot) => total + bot.links.length, 0),
    totalTags: pinnedBots.length > 0
      ? new Set(pinnedBots.flatMap((bot) => bot.tags)).size
      : new Set(filteredBots.flatMap((bot) => bot.tags)).size,
  };

  const handleSearchTextChange = (e) => {
    const newSearchText = e.target.value;
    setSearchText(newSearchText);
   
    // Only resize if content exceeds 3 lines
    if (searchInputRef.current) {
      const lineHeight = 24;
      const minHeight = lineHeight * 3;  // 3 lines
      const maxHeight = 200;  // maximum height
      
      if (searchInputRef.current.scrollHeight > minHeight) {
        searchInputRef.current.style.height = 
          `${Math.min(searchInputRef.current.scrollHeight, maxHeight)}px`;
      }
    }
   
    // Only show suggestions in search mode
    if (mode === 'search') {
      setSearchSuggestions(
        newSearchText
          ? getInitialSearchSuggestions().filter((item) =>
              item.toLowerCase().includes(newSearchText.toLowerCase())
            )
          : []
      );
    }
  };
  
  const handleSuggestionClick = (suggestion) => {
    setSearchText(suggestion);
    setSearchSuggestions([]);
  };
  
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Update your toggleExpand function to use the new setter
  const toggleExpand = (botId) => {
    setExpandedBotsWithRef((prevExpandedBots) => ({
      ...prevExpandedBots,
      [botId]: !prevExpandedBots[botId],
    }));
  };

  const indexOfLastBot = currentPage * botsPerPage;
  const indexOfFirstBot = indexOfLastBot - botsPerPage;
  const currentBots = filteredBots.slice(indexOfFirstBot, indexOfLastBot);

  const handleContextMenu = (e, type, itemId, index = null) => {
    e.preventDefault();
    const rect = e.target.getBoundingClientRect();
    setContextMenu({
      show: true,
      x: e.clientX || rect.left,
      y: e.clientY || rect.bottom,
      type,
      itemId,
      index
    });
  };

  // Add click handler to close context menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setContextMenu({ show: false });
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleSystemPromptEdit = (botId, newPrompt) => {
    const updatedBots = allBots.map(bot => 
      bot.id === botId ? { ...bot, systemPrompt: newPrompt } : bot
    );
    setAllBots(updatedBots);
    setFilteredBots(prevFiltered => 
      prevFiltered.map(bot => 
        bot.id === botId ? { ...bot, systemPrompt: newPrompt } : bot
      )
    );
  };

  // Check if controls overflow and need scrolling
  const checkControlsOverflow = () => {
    if (controlsRef.current) {
      const hasOverflow = controlsRef.current.scrollWidth > controlsRef.current.clientWidth;
      controlsRef.current.classList.toggle('has-overflow', hasOverflow && pinnedBots.length > 0);
    }
  };

  // Auto-scroll to show Clear All Pins when pins change
  useEffect(() => {
    if (controlsRef.current && pinnedBots.length > 0) {
      controlsRef.current.scrollTo({
        left: controlsRef.current.scrollWidth,
        behavior: 'smooth'
      });
    }
  }, [pinnedBots.length]);

  // Check for overflow on mount and resize
  useEffect(() => {
    checkControlsOverflow();
    window.addEventListener('resize', checkControlsOverflow);
    return () => window.removeEventListener('resize', checkControlsOverflow);
  }, [pinnedBots.length]);

  const handleAddSharePointLink = (botId) => {
    const dialog = document.createElement('div');
    dialog.className = 'sharepoint-dialog';
    dialog.innerHTML = `
      <div class="sharepoint-content">
        <h4>SharePoint Site</h4>
        <input 
          type="text" 
          id="sharepoint-input" 
          placeholder="https://www.sharepoint.com/example123"
          value="${allBots.find(bot => bot.id === botId)?.links[0]?.url || ''}"
        />
        <div class="dialog-buttons">
          <button class="cancel-button">Cancel</button>
          <button class="add-button">Add</button>
        </div>
      </div>
    `;
    document.body.appendChild(dialog);
    
    const input = dialog.querySelector('#sharepoint-input');
    input.focus();
    
    const handleAdd = () => {
      const url = input.value.trim();
      if (url) {
        const newLink = {
          url,
          version: '1.0',
          lastUpdated: new Date().toLocaleDateString(),
          status: 'pending',
          description: url.split('/').pop() || 'SharePoint Site'
        };
        const updatedBots = allBots.map((bot) =>
          bot.id === botId ? { ...bot, links: [...bot.links, newLink] } : bot
        );
        setAllBots(updatedBots);
        setFilteredBots(prevFiltered => 
          prevFiltered.map(bot => 
            bot.id === botId ? { ...bot, links: [...bot.links, newLink] } : bot
          )
        );
      }
      document.body.removeChild(dialog);
    };
    
    dialog.querySelector('.add-button').addEventListener('click', handleAdd);
    dialog.querySelector('.cancel-button').addEventListener('click', () => {
      document.body.removeChild(dialog);
    });
    
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleAdd();
      if (e.key === 'Escape') document.body.removeChild(dialog);
    });
  };

  // Move getStatsForBot outside of LinkStatusDashboard and into the main App component
  const getStatsForBot = (id) => {
    const baseStats = {
      1: { success: 342, pending: 15, failed: 3 },    // Customer Support Bot
      2: { success: 256, pending: 8, failed: 5 },     // Sales Inquiry Bot
      3: { success: 189, pending: 23, failed: 7 },    // HR Policy Bot
      4: { success: 423, pending: 12, failed: 4 },    // Technical Support Bot
      5: { success: 167, pending: 19, failed: 2 },    // Marketing Bot
      6: { success: 298, pending: 7, failed: 6 },     // Financial Bot
      7: { success: 156, pending: 14, failed: 8 },    // Legal Bot
      8: { success: 234, pending: 9, failed: 3 },     // Operations Bot
      9: { success: 312, pending: 16, failed: 5 },    // Product Development Bot
      10: { success: 278, pending: 11, failed: 4 },   // IT Support Bot
      11: { success: 145, pending: 8, failed: 2 },    // Quality Assurance Bot
      12: { success: 198, pending: 13, failed: 6 },   // Project Management Bot
      13: { success: 467, pending: 21, failed: 9 },   // Data Analytics Bot
      14: { success: 223, pending: 17, failed: 3 },   // Compliance Bot
      15: { success: 178, pending: 12, failed: 4 },   // Training Bot
      16: { success: 134, pending: 6, failed: 2 },    // Facilities Bot
      17: { success: 289, pending: 18, failed: 7 },   // Research Bot
      18: { success: 156, pending: 9, failed: 3 },    // Security Bot
      19: { success: 245, pending: 14, failed: 5 },   // Supply Chain Bot
      20: { success: 167, pending: 11, failed: 4 },   // Risk Management Bot
      21: { success: 143, pending: 8, failed: 2 },    // Change Management Bot
      22: { success: 198, pending: 15, failed: 6 },   // Innovation Bot
      23: { success: 267, pending: 13, failed: 5 },   // Documentation Bot
      24: { success: 189, pending: 10, failed: 3 },   // Process Improvement Bot
      25: { success: 145, pending: 7, failed: 2 }     // Sustainability Bot
    };
    return baseStats[id] || { success: 0, pending: 0, failed: 0 };
  };

  // Update the getBotMetrics function to generate whole numbers
  const getBotMetrics = (botId) => {
    // Use botId as seed for consistent random numbers
    const seed = botId * 12345;
    const rand = (min, max) => {
      const x = Math.sin(seed) * 10000;
      return Math.floor((x - Math.floor(x)) * (max - min + 1)) + min;
    };

    // Generate chats (1-70,000) as whole number
    const chats = Math.floor(rand(1, 70000));
    
    // Generate queries (approximately 5x chats) as whole number
    const queries = Math.floor(chats * 5 + rand(-chats/2, chats/2));

    return {
      chats,
      queries,
      rank: 0  // Will be a whole number assigned in calculateRanks
    };
  };

  // Add this function to calculate ranks based on query volumes
  const calculateRanks = () => {
    const allMetrics = Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      ...getBotMetrics(i + 1)
    }));
    
    // Sort by queries in descending order
    allMetrics.sort((a, b) => b.queries - a.queries);
    
    // Assign ranks
    const rankedMetrics = {};
    allMetrics.forEach((metric, index) => {
      rankedMetrics[metric.id] = {
        ...metric,
        rank: index + 1
      };
    });
    
    return rankedMetrics;
  };

  // Store the calculated metrics
  const botMetrics = calculateRanks();

  // Update the LinkStatusDashboard component to display whole numbers
  const LinkStatusDashboard = ({ links, botId }) => {
    const stats = getStatsForBot(botId);
    const metrics = botMetrics[botId];

    return (
      <div className="dashboard-container">
        <div className="dashboard-section">
          <h4>Files</h4>
          <div className="link-status-dashboard">
            <div className="status-item">
              <FaCheckCircle className="status-icon success" />
              <span className="status-count">{stats.success}</span>
              <span className="status-label">Processed</span>
            </div>
            <div className="status-item">
              <FaCheckCircle className="status-icon pending" />
              <span className="status-count">{stats.pending}</span>
              <span className="status-label">Processing</span>
            </div>
            <div className="status-item">
              <FaTimesCircle className="status-icon failed" />
              <span className="status-count">{stats.failed}</span>
              <span className="status-label">Failed</span>
            </div>
          </div>
        </div>
        
        <div className="dashboard-section">
          <h4>Metrics</h4>
          <div className="link-status-dashboard">
            <div className="status-item">
              <span className="status-count">{Math.floor(metrics.chats).toLocaleString()}</span>
              <span className="status-label">Chats</span>
            </div>
            <div className="status-item">
              <span className="status-count">{Math.floor(metrics.queries).toLocaleString()}</span>
              <span className="status-label">Queries</span>
            </div>
            <div className="status-item">
              <span className="status-count">#{metrics.rank}</span>
              <span className="status-label">Rank</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Add a new state to track edit mode for system prompts
  const [editingPrompts, setEditingPrompts] = useState({});

  // Add this helper function to determine how many page numbers to show
  const getVisiblePageNumbers = () => {
    if (window.innerWidth <= 768) {
      return 3; // Show only 3 pages on mobile (current, prev, next)
    } else if (window.innerWidth <= 1024) {
      return 5; // Show 5 pages on tablet
    } else {
      return 7; // Show up to 7 pages on desktop
    }
  };

  // Add new state for orchestrator mode
  const [isOrchestratorMode, setIsOrchestratorMode] = useState(true);

  // Add new state for feedback dialog
  const [feedbackDialog, setFeedbackDialog] = useState({
    isOpen: false,
    messageId: null,
    isPositive: null,
    text: ''
  });

  // Add feedback handler
  const handleFeedback = (messageId, isPositive) => {
    setFeedbackDialog({
      isOpen: true,
      messageId,
      isPositive,
      text: ''
    });
  };

  // Add feedback submit handler
  const handleFeedbackSubmit = () => {
    // Here you would typically send the feedback to your backend
    console.log('Feedback submitted:', feedbackDialog);
    setFeedbackDialog({
      isOpen: false,
      messageId: null,
      isPositive: null,
      text: ''
    });
  };

  // Update the existing useEffect that handles chat messages
  useEffect(() => {
    if (chatHistory.length > 0) {
      // Wait for the DOM to update
      setTimeout(() => {
        // Try all possible container selectors
        const containers = [
          document.querySelector('.chat-container'),
          document.querySelector('.rce-container-mlist'),
          document.querySelector('.rce-mlist')
        ];

        containers.forEach(container => {
          if (container) {
            container.scrollTo({
              top: container.scrollHeight,
              behavior: 'smooth'
            });
          }
        });
      }, 200); // Increased delay to ensure message is rendered
    }
  }, [chatHistory]); // Trigger when chat history changes

  // Add new state to track which section is open
  const [openSection, setOpenSection] = useState(null); // 'help', 'stats', or 'saved'

  // Update the toggle handlers
  const toggleHelp = () => {
    setOpenSection(openSection === 'help' ? null : 'help');
  };

  const toggleStats = () => {
    setOpenSection(openSection === 'stats' ? null : 'stats');
  };

  // Update the useEffect for click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Use the ref instead of the state directly
      const currentExpandedBots = Object.entries(expandedBotsRef.current)
        .filter(([_, isExpanded]) => isExpanded);
      
      for (const [botId] of currentExpandedBots) {
        const botCard = document.querySelector(`[data-bot-id="${botId}"]`);
        
        if (botCard && !botCard.contains(event.target)) {
          setExpandedBotsWithRef(prev => ({
            ...prev,
            [botId]: false
          }));
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []); // Empty dependency array since we're using ref

  return (
    <div className={`veyr-container ${showMenu ? 'menu-open' : ''}`} data-mode={mode}>
        <input 
          type="file" 
          id="file-upload" 
          accept=".csv,.txt" 
          style={{ display: 'none' }} 
          onChange={handleUpload}
        />
        <div className="header">
          <button 
            className="hamburger-menu" 
            onClick={() => setShowMenu(!showMenu)}
            style={{ display: showMenu ? 'none' : 'flex' }}
          >
            {window.innerWidth <= 768 ? (
              <GiHamburgerMenu size={24} />
            ) : (
              <>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
              </>
            )}
          </button>
          <div className="header-content">
            <div className="title-row">
              <h1>VeyR</h1>
              <span className="header-subtitle">- The Intralox Chatbot Aggregator</span>
            </div>
            <div className="mode-toggle">
              <button
                className={mode === 'search' ? 'active' : ''}
                onClick={() => setMode('search')}
              >
                <FaSearch size={24} />
              </button>
              <button
                className={mode === 'chat' ? 'active' : ''}
                onClick={() => {
                  setMode('chat');
                  setSearchText('');
                  // If there are pinned bots, set to "Pick chatbot(s)" mode
                  if (pinnedBots.length > 0) {
                    setIsOrchestratorMode(false);
                  }
                }}
              >
                <FaComment size={24} />
              </button>
            </div>
          </div>
        </div>

        {showMenu && (
            <>
            <div 
                className={`menu-overlay ${showMenu ? 'active' : ''}`}
                onClick={() => setShowMenu(false)}
            ></div>
            <div className={`menu-content ${showMenu ? 'active' : ''}`}>
                <div className="menu-close" onClick={() => setShowMenu(false)}>
                    <FaTimes className="close-icon" /> Close Menu
                </div>
                <button onClick={() => {/* handle profile */}}>Profile</button>
                <button onClick={() => {/* handle settings */}}>Settings</button>
                <button onClick={() => {/* handle support */}}>Support</button>
                <button onClick={() => {/* handle sign out */}}>Sign Out</button>
            </div>
            </>
        )}

        {mode === 'search' && (
          <div className="search-chat-area">
            <div className="input-mode-container">
              <textarea
                ref={searchInputRef}
                className="search-chat-input"
                placeholder="Search for chatbot(s), pin to chat..."
                value={searchText}
                onChange={handleSearchTextChange}
              />
              {searchText && (
                <button 
                  className="clear-text-button"
                  onClick={() => {
                    setSearchText('');
                    if (searchInputRef.current) {
                      searchInputRef.current.focus();
                    }
                  }}
                >
                  <FaTimes />
                </button>
              )}
              <div className="search-suggestions">
                {searchSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="suggestion"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="content-area">
          {mode === 'chat' ? (
            <div className="chat-content">
              <div className="chat-mode-toggle">
                <span className={!isOrchestratorMode ? 'active' : ''}>Pick chatbot(s)</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={isOrchestratorMode}
                    onChange={() => {
                      setIsOrchestratorMode(!isOrchestratorMode);
                      if (isOrchestratorMode) {
                        setTimeout(() => {
                          setMode('search');
                        }, 600);
                      }
                    }}
                  />
                  <span className="slider round"></span>
                </label>
                <span className={isOrchestratorMode ? 'active' : ''}>Orchestrator</span>
                {chatHistory.length > 0 && (
                  <button className="clear-chat" onClick={() => setChatHistory([])}>
                    Clear Chat
                  </button>
                )}
              </div>

              <div className="chat-container">
                <MessageList
                  className='message-list'
                  lockable={false}
                  toBottomHeight={'100%'}
                  downButton={true}
                  downButtonBadge={true}
                  scrollBehavior="smooth"
                  dataSource={chatHistory.map((message, index) => ({
                    position: message.sender === 'user' ? 'left' : 'right',
                    type: 'text',
                    text: (
                      <div className="message-content">
                        {message.text}
                        {message.sender === 'bot' && (
                          <div className="message-feedback">
                            <button 
                              className="feedback-button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleFeedback(index, true);
                              }}
                            >
                              <FaThumbsUp />
                            </button>
                            <button 
                              className="feedback-button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleFeedback(index, false);
                              }}
                            >
                              <FaThumbsDown />
                            </button>
                          </div>
                        )}
                      </div>
                    ),
                    date: new Date(),
                    id: index,
                  }))}
                />
                
                <div className="chat-input-container">
                  <Input
                    key={chatHistory.length}
                    placeholder={
                      chatHistory.length > 0
                        ? "Submit your message to the orchestrator here..."
                        : isOrchestratorMode
                          ? 'Start chatting and let the orchestrator decide which chatbots to use for you...'
                          : pinnedBots.length > 0
                            ? pinnedBots.length <= 3
                              ? `Chat with ${pinnedBots.map(bot => bot.name).join(', ')}`
                              : (() => {
                                  const randomBots = [...pinnedBots]
                                    .sort(() => 0.5 - Math.random())
                                    .slice(0, 3);
                                  return `Chat with ${randomBots.map(bot => bot.name).join(', ')} & ${pinnedBots.length - 3} other chatbots`;
                                })()
                            : 'Please pick your chatbot(s) on the search page'
                    }
                    multiline={true}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={(e) => {
                      // Check if it's a touch device
                      const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
                      
                      if (e.key === 'Enter') {
                        // For mobile, submit on Enter without checking for shift
                        if (isMobile) {
                          e.preventDefault();
                          handleChatSubmit();
                        } 
                        // For desktop, only submit if shift is not pressed
                        else if (!e.shiftKey) {
                          e.preventDefault();
                          handleChatSubmit();
                        }
                      }
                    }}
                    rightButtons={
                      <button 
                        className={`chat-submit-button ${(!isOrchestratorMode && pinnedBots.length === 0) ? 'disabled' : ''}`}
                        onClick={handleChatSubmit}
                        disabled={!isOrchestratorMode && pinnedBots.length === 0}
                      >
                        <FaArrowUp />
                      </button>
                    }
                  />
                </div>
              </div>
            </div>
          ) : (
            // Search Mode Content
            <div className="search-content">
              <div className="controls" ref={controlsRef}>
                <button onClick={toggleHelp}>
                  <FaQuestionCircle /> Help
                </button>
                <button onClick={toggleStats}>
                  <FaPlus /> Statistics
                </button>
                <button onClick={addBot}>
                  <FaPlus /> Add Bot
                </button>
                {allBots.length > pinnedBots.length && (
                  <button onClick={() => {
                    const unpinnedBots = allBots.filter(bot => !pinnedBots.some(p => p.id === bot.id));
                    setPinnedBots([...pinnedBots, ...unpinnedBots]);
                  }}>
                    <FaThumbtack /> Pin All
                  </button>
                )}
                {pinnedBots.length >= 2 && pinnedBots.length < allBots.length && (
                  <button onClick={() => setShowPinnedOnly(!showPinnedOnly)}>
                    {showPinnedOnly ? <FaSearch /> : <FaThumbtack />}
                    {showPinnedOnly ? 'Show All' : 'Show Pinned Only'}
                  </button>
                )}
                {pinnedBots.length > 0 && (
                  <button onClick={() => {
                    setPinnedBots([]);
                    setMode('search');
                    setShowPinnedOnly(false);
                    handleSearch();
                  }}>
                    <FaThumbtack /> Clear All Pins
                  </button>
                )}
              </div>

              <div className="secondary-controls">
                <button onClick={() => setOpenSection(openSection === 'saved' ? null : 'saved')}>
                  {openSection === 'saved' ? 'Close Saved Searches' : 'Saved Searches'}
                </button>
                <button
                  className="sort-toggle-button"
                  onClick={handleSortToggle}
                >
                  Sort by: {sortMode === 'alpha' ? 'A-Z' : 'Rank'}
                </button>
              </div>

              {openSection === 'saved' && (
                <div className="help-section">
                  <h3>Saved Searches</h3>
                  <div className="saved-searches-content">
                    {savedSearches.map((search, index) => (
                      <div
                        key={index}
                        className="saved-search"
                        onClick={() => handleLoadSearch(search)}
                      >
                        {search.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {openSection === 'help' && (
                <div className="help-section">
                  <h3>Help</h3>
                  <p>Welcome to VeyR - The Intralox Chatbot Aggregator</p>
                  
                  <h4>Getting Started:</h4>
                  <ul>
                    <li>Search for chatbots using keywords in the search bar</li>
                    <li>Pin chatbots by clicking the pin icon</li>
                    <li>Switch to chat mode to interact with pinned chatbots</li>
                  </ul>
                  
                  <h4>Search Tips:</h4>
                  <ul>
                    <li><strong>Single Word:</strong> Type "support" to find any chatbot with "support" in its name or tags</li>
                    <li><strong>Multiple Words (AND):</strong> Type "technical support" to find chatbots containing BOTH "technical" AND "support"</li>
                    <li><strong>Multiple Groups (OR):</strong> Type "technical support OR sales customer" to find chatbots containing EITHER (both "technical" AND "support") OR (both "sales" AND "customer")</li>
                    <li><strong>Complex Searches:</strong> You can combine multiple groups, like "hr policy OR technical support OR customer service"</li>
                    <li><strong>Optional Parentheses:</strong> You can use parentheses for clarity: "(hr policy) OR (technical support)"</li>
                  </ul>
                  
                  <h4>Features:</h4>
                  <ul>
                    <li>Pin: Save chatbots for quick access</li>
                    <li>Tags: Filter chatbots by category</li>
                    <li>SharePoint Integration: Access and manage SharePoint documents</li>
                    <li>System Prompts: Customize bot behavior</li>
                  </ul>
                  
                  <h4>Search Examples:</h4>
                  <ul>
                    <li>"support" → Finds any bot with "support" in name or tags</li>
                    <li>"technical support" → Finds bots with both words</li>
                    <li>"hr policy OR sales"  Finds bots with either both "hr" and "policy", or "sales"</li>
                    <li>"customer service OR technical support OR helpdesk" → Finds bots matching any of these combinations</li>
                  </ul>
                </div>
              )}

              {openSection === 'stats' && (
                <div className="stats-section">
                  <h3>Statistics for Pinned Chatbots</h3>
                  <div className="stats-grid">
                    <div className="stat-item">
                      <FaThumbtack className="status-icon" style={{ transform: 'rotate(45deg)' }} />
                      <h4>Pinned Chatbots</h4>
                      <p>{pinnedBots.length}</p>
                    </div>
                    <div className="stat-item">
                      <FaComment className="status-icon" />
                      <h4>Total Chats</h4>
                      <p>{pinnedBots.reduce((sum, bot) => {
                        const metrics = botMetrics[bot.id];
                        return sum + metrics.chats;
                      }, 0).toLocaleString()}</p>
                    </div>
                    <div className="stat-item">
                      <FaSearch className="status-icon" />
                      <h4>Total Queries</h4>
                      <p>{pinnedBots.reduce((sum, bot) => {
                        const metrics = botMetrics[bot.id];
                        return sum + metrics.queries;
                      }, 0).toLocaleString()}</p>
                    </div>
                    <div className="stat-item">
                      <FaCheckCircle className="status-icon success" />
                      <h4>Files Processed</h4>
                      <p>{pinnedBots.reduce((sum, bot) => {
                        const stats = getStatsForBot(bot.id);
                        return sum + stats.success;
                      }, 0)}</p>
                    </div>
                    <div className="stat-item">
                      <FaCheckCircle className="status-icon pending" />
                      <h4>Files Processing</h4>
                      <p>{pinnedBots.reduce((sum, bot) => {
                        const stats = getStatsForBot(bot.id);
                        return sum + stats.pending;
                      }, 0)}</p>
                    </div>
                    <div className="stat-item">
                      <FaTimesCircle className="status-icon failed" />
                      <h4>Files Failed</h4>
                      <p>{pinnedBots.reduce((sum, bot) => {
                        const stats = getStatsForBot(bot.id);
                        return sum + stats.failed;
                      }, 0)}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="bot-list">
                {(window.innerWidth <= 768 ? 
                  filteredBots.slice(indexOfFirstBot, indexOfLastBot) : 
                  currentBots
                ).map((bot) => (
                  <div 
                    className={`bot-card ${expandedBots[bot.id] ? 'expanded' : ''}`}
                    key={bot.id}
                    data-bot-id={bot.id}
                    onContextMenu={(e) => handleContextMenu(e, 'bot', bot.id)}
                  >
                    <div className="bot-header">
                      <h3>{bot.name}</h3>
                      <div className="bot-actions">
                        <button className="pin-button" onClick={() => togglePin(bot.id)}>
                          <FaThumbtack 
                            className={pinnedBots.some((b) => b.id === bot.id) ? 'pinned' : ''}
                            style={{ transform: pinnedBots.some((b) => b.id === bot.id) ? 'rotate(45deg)' : 'none' }}
                          />
                        </button>
                        <button
                          className="edit-button hidden"
                          onClick={() => handleEdit(bot.id, 'name')}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="delete-button hidden"
                          onClick={() => handleDelete(bot.id, 'bot')}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                    <div className="bot-tags-container">
                        <div className="bot-tags">
                            {bot.tags.map((tag, index) => (
                                <span 
                                  key={index} 
                                  className="tag"
                                  onContextMenu={(e) => handleContextMenu(e, 'tag', bot.id, index)}
                                >
                                  {tag}
                                </span>
                            ))}
                            <button className="add-tag-button" onClick={() => addTag(bot.id)}>
                                <FaPlus />
                            </button>
                        </div>
                    </div>
                    <button className="expand-button" onClick={() => toggleExpand(bot.id)}>
                        {expandedBots[bot.id] ? <FaChevronUp /> : <FaChevronDown />}
                    </button>

                    {expandedBots[bot.id] && (
                      <div className="bot-expanded-content">
                        <div className="bot-links">
                          <div className="sharepoint-links-container">
                            <button className="add-sharepoint-link" onClick={() => handleAddSharePointLink(bot.id)}>
                              <FaLink /> SharePoint Site
                              {bot.links[0] && (
                                <span className="current-url">({bot.links[0].url})</span>
                              )}
                            </button>
                            <div 
                              className="add-new-sharepoint-link" 
                              onClick={() => handleAddSharePointLink(bot.id)}
                            >
                              <FaPlus /> Add Additional SharePoint Site
                            </div>
                          </div>
                          <LinkStatusDashboard links={bot.links} botId={bot.id} />
                        </div>
                        <div className="bot-system-prompt">
                          <div className="system-prompt-header">
                            <h4>System Prompt:</h4>
                            <button 
                              className="edit-button"
                              onClick={(e) => {
                                e.preventDefault();
                                const textarea = e.target.closest('.bot-system-prompt').querySelector('textarea');
                                if (!editingPrompts[bot.id]) {
                                  textarea.readOnly = false;
                                  textarea.focus();
                                  setEditingPrompts(prev => ({ ...prev, [bot.id]: true }));
                                } else {
                                  textarea.readOnly = true;
                                  setEditingPrompts(prev => ({ ...prev, [bot.id]: false }));
                                  handleSystemPromptEdit(bot.id, textarea.value);
                                }
                              }}
                            >
                              {editingPrompts[bot.id] ? <FaSave /> : <FaEdit />}
                            </button>
                          </div>
                          <textarea
                            readOnly={!editingPrompts[bot.id]}
                            value={bot.systemPrompt}
                            onChange={(e) => handleSystemPromptEdit(bot.id, e.target.value)}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="pagination mobile-pagination">
                <span>
                  {`${indexOfFirstBot + 1}-${Math.min(indexOfLastBot, filteredBots.length)}/${filteredBots.length}`}
                </span>
                <div className="pagination-buttons">
                  {(() => {
                    const visiblePages = getVisiblePageNumbers();
                    const halfVisible = Math.floor(visiblePages / 2);
                    const totalPages = Math.ceil(filteredBots.length / botsPerPage);
                    const pageNumbers = new Set(); // Use Set to prevent duplicates

                    // Always add first page if we're not on page 1
                    if (currentPage > 1) {
                      pageNumbers.add(1);
                    }

                    // Add ellipsis after first page if needed
                    if (currentPage > halfVisible + 2) {
                      pageNumbers.add('start-ellipsis');
                    }

                    // Add pages around current page, including current page
                    for (let i = Math.max(2, currentPage - halfVisible); 
                         i <= Math.min(totalPages - 1, currentPage + halfVisible); 
                         i++) {
                      pageNumbers.add(i);
                    }

                    // Always add current page if it's not already added
                    pageNumbers.add(currentPage);

                    // Add ellipsis before last page if needed
                    if (currentPage < totalPages - halfVisible - 1) {
                      pageNumbers.add('end-ellipsis');
                    }

                    // Always add last page if we're not on it
                    if (currentPage < totalPages) {
                      pageNumbers.add(totalPages);
                    }

                    // Convert to array and sort to maintain proper order
                    return Array.from(pageNumbers)
                      .sort((a, b) => {
                        if (a === 'start-ellipsis') return -1;
                        if (b === 'start-ellipsis') return 1;
                        if (a === 'end-ellipsis') return 1;
                        if (b === 'end-ellipsis') return -1;
                        return a - b;
                      })
                      .map((pageNum, index) => {
                        if (pageNum === 'start-ellipsis' || pageNum === 'end-ellipsis') {
                          return <span key={`ellipsis-${index}`}>...</span>;
                        }
                        return (
                          <button
                            key={pageNum}
                            className={currentPage === pageNum ? 'active' : ''}
                            onClick={() => handlePageChange(pageNum)}
                          >
                            {pageNum}
                          </button>
                        );
                      });
                  })()}
                </div>
              </div>
            </div>
          )}
        </div>

        {contextMenu.show && (
          <div className="context-menu">
            {contextMenu.type === 'bot' && (
              <>
                <button onClick={() => {
                  handleDelete(contextMenu.itemId, 'bot');
                  setContextMenu({ show: false });
                }}>
                  <FaTrash /> Delete Bot
                </button>
              </>
            )}
            
            {contextMenu.type === 'tag' && (
              <>
                <button onClick={() => {
                  handleDelete(contextMenu.itemId, 'tag', contextMenu.index);
                  setContextMenu({ show: false });
                }}>
                  <FaTrash /> Delete Tag
                </button>
              </>
            )}
            
            {contextMenu.type === 'link' && (
              <>
                <button onClick={() => {
                  handleDelete(contextMenu.itemId, 'link', contextMenu.index);
                  setContextMenu({ show: false });
                }}>
                  <FaTrash /> Delete Link
                </button>
              </>
            )}
          </div>
        )}

        {feedbackDialog.isOpen && (
          <div className="feedback-dialog-overlay">
            <div className="feedback-dialog">
              <h3>{feedbackDialog.isPositive ? 'What was helpful?' : 'What could be improved?'}</h3>
              <textarea
                value={feedbackDialog.text}
                onChange={(e) => setFeedbackDialog({...feedbackDialog, text: e.target.value})}
                placeholder="Your feedback helps us improve..."
              />
              <div className="feedback-dialog-buttons">
                <button onClick={() => setFeedbackDialog({...feedbackDialog, isOpen: false})}>
                  Cancel
                </button>
                <button onClick={handleFeedbackSubmit}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}

        <footer className="intralox-footer">
          <span>Intralox 2025</span>
        </footer>
    </div>
  );
}

export default App;